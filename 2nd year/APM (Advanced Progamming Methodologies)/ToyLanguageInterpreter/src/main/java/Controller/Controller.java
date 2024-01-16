package Controller;

import Exceptions.MyException;
import Model.ProgramState.ProgramState;
import Model.Values.ReferenceValue;
import Model.Values.Value;
import Repository.IRepository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

public class Controller {
    private final IRepository repository;
    private ExecutorService executor = Executors.newFixedThreadPool(2);

    public Controller(IRepository repository) {
        this.repository = repository;
    }

    public void oneStepForAllPrograms(List<ProgramState> programStateList) {
        programStateList.forEach(programState -> {
            try {
                this.repository.logProgramStateExecution(programState);
            } catch (MyException e) {
                throw new RuntimeException(e);
            }
        });

        List<Callable<ProgramState>> callList = programStateList.stream()
                .map((ProgramState programState) -> (Callable<ProgramState>) programState::oneStep)
                .toList();

        try {
            List<ProgramState> newProgramStateList = this.executor.invokeAll(callList).stream()
                    .map(future -> {
                        try {
                            return future.get();
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .filter(Objects::nonNull)
                    .toList();

            programStateList.addAll(newProgramStateList);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        programStateList.forEach(programState -> {
            try {
                this.repository.logProgramStateExecution(programState);
            } catch (MyException e) {
                throw new RuntimeException(e);
            }
        });

        this.repository.setProgramStateList(programStateList);
    }

    public void allSteps() {
        this.executor = Executors.newFixedThreadPool(2);
        List<ProgramState> programStateList = this.removeCompletedPrograms(this.repository.getProgramStateList());
        while(!programStateList.isEmpty()) {
            this.repository.getHeap().setContent(
                    this.garbageCollector(
                        this.getAddrFromSymbolTable(this.repository.getSymbolTable().values()),
                        this.repository.getHeap().getContent()
            ));
            this.oneStepForAllPrograms(programStateList);
            programStateList = this.removeCompletedPrograms(this.repository.getProgramStateList());
        }
        this.executor.shutdownNow();

        this.repository.setProgramStateList(programStateList);
    }

    public Map<Integer, Value> garbageCollector(List<Integer> symbolTableAddr, Map<Integer, Value> heap) {
        return heap.entrySet().stream()
                .filter(e -> {
                    for(Value value : heap.values()) {
                        if(value instanceof ReferenceValue referenceValue) {
                            if(referenceValue.getAddress() == e.getKey()) {
                                return true;
                            }
                        }
                    }
                    return symbolTableAddr.contains(e.getKey());
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public List<Integer> getAddrFromSymbolTable(Collection<Value> symbolTableValues) {
        return symbolTableValues.stream()
                .filter(v -> v instanceof ReferenceValue)
                .map(v -> {
                    ReferenceValue v1 = (ReferenceValue) v;
                    return v1.getAddress();
                })
                .collect(Collectors.toList());
    }

    public List<ProgramState> removeCompletedPrograms(List<ProgramState> programStateList) {
        return programStateList.stream()
                .filter(ProgramState::isNotCompleted)
                .collect(Collectors.toList());
    }

    public IRepository getRepository() {
        return this.repository;
    }

    public ExecutorService getExecutor() {
        return this.executor;
    }
}

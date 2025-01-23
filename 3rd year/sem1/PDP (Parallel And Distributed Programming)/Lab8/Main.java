import mpi.MPI;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        MPI.Init(args);
        int me = MPI.COMM_WORLD.Rank();
        int size = MPI.COMM_WORLD.Size();
        DSM dsm = new DSM();
        System.out.println("Start "+me+" of "+size);
        if (me == 0) {
            Thread thread = new Thread(new Subscriber(dsm));

            thread.start();

            dsm.subscribeTo("A");
            dsm.subscribeTo("B");
            dsm.subscribeTo("C");
            dsm.checkAndReplace("A",0,10);
            dsm.checkAndReplace("B",2,30);
            dsm.checkAndReplace("C",100, 20);
            dsm.close();

            thread.join();

        } else if (me == 1) {
            Thread thread = new Thread(new Subscriber(dsm));

            thread.start();

            dsm.subscribeTo("A");
            dsm.subscribeTo("B");
            dsm.subscribeTo("C");


            thread.join();
        } else if (me == 2) {
            Thread thread = new Thread(new Subscriber(dsm));

            thread.start();
            dsm.subscribeTo("A");
            dsm.subscribeTo("B");
            dsm.subscribeTo("C");
            dsm.checkAndReplace("B", 1, 50);

            thread.join();
        }
        MPI.Finalize();
    }
}
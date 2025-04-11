import domain.Pair;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import repository.NotaXMLRepository;
import repository.StudentXMLRepository;
import repository.TemaXMLRepository;
import service.Service;
import validation.NotaValidator;
import validation.StudentValidator;
import validation.TemaValidator;
import domain.Pair;
import validation.ValidationException;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class TestAddGrade {
    private StudentXMLRepository studentXMLRepository;
    private TemaXMLRepository temaXMLRepository;
    private NotaXMLRepository notaXMLRepository;
    private StudentValidator studentValidator;
    private TemaValidator temaValidator;
    private NotaValidator notaValidator;
    private Service service;

    @BeforeAll
    static void createFiles() {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter("studentiTest.xml"));
            writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
                    "<Entitati>\n" +
                    "</Entitati>");
            writer.close();

            writer = new BufferedWriter(new FileWriter("temeTest.xml"));
            writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
                    "<Entitati>\n" +
                    "</Entitati>");
            writer.close();

            writer = new BufferedWriter(new FileWriter("noteTest.xml"));
            writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
                    "<Entitati>\n" +
                    "</Entitati>");
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @BeforeEach
    void setup() {
        this.studentValidator = new StudentValidator();
        this.temaValidator = new TemaValidator();
        this.notaValidator = new NotaValidator();
        this.notaXMLRepository = new NotaXMLRepository(this.notaValidator, "noteTest.xml");
        this.studentXMLRepository = new StudentXMLRepository(this.studentValidator, "studentiTest.xml");
        this.temaXMLRepository = new TemaXMLRepository(this.temaValidator, "temeTest.xml");
        this.service = new Service(this.studentXMLRepository, this.temaXMLRepository, this.notaXMLRepository);

        this.service.saveStudent("99", "Popescu", 933);
        this.service.saveTema("99", "tema1", 5, 2);
    }

    @AfterAll
    static void removeXML() {
        File file = new File("studentiTest.xml");
        file.delete();

        file = new File("temeTest.xml");
        file.delete();

        file = new File("noteTest.xml");
        file.delete();
    }

    @Test
    void testAddGrade() {
        assertEquals(1, this.service.saveNota("99", "99", 10, 5, "ok"));
    }

    @Test
    void testAddStudent() {
        assertEquals(1, this.service.saveStudent("100", "Popescu", 933));
    }

    @Test
    void testAddAssignment() {
        assertEquals(1, this.service.saveTema("100", "tema1", 5, 2));
    }

    @Test
    void testIntegration() {
        this.service.saveStudent("101", "Popescu", 933);
        assertEquals("101", this.studentXMLRepository.findOne("101").getID());
        this.service.saveTema("101", "tema1", 5, 2);
        assertEquals("101", this.temaXMLRepository.findOne("101").getID());
        this.service.saveNota("101", "101", 10, 5, "ok");
        assertEquals(new Pair("101", "101"), this.notaXMLRepository.findOne(new Pair("101", "101")).getID());
    }
}

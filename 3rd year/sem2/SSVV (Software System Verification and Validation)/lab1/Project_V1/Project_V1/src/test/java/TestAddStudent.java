import org.junit.jupiter.api.*;
import repository.NotaXMLRepository;
import repository.StudentXMLRepository;
import repository.TemaXMLRepository;
import service.Service;
import validation.NotaValidator;
import validation.StudentValidator;
import validation.TemaValidator;
import validation.ValidationException;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


public class TestAddStudent {
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
    void testAddStudentOnInvalidGroup() {
        assertEquals(1, this.service.saveStudent("23", "cristi", -10));
    }

    @Test
    void testAddStudentOnValidGroup() {
        assertEquals(1, this.service.saveStudent("30", "luca", 936));
    }
}

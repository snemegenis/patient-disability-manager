package controller;

import bean.Patient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJson;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import service.PatientService;
import util.JSONHelper;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by liutkvai on 11/20/2017.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(controllers = { PatientController.class })
@ContextConfiguration(classes = PatientController.class)
@AutoConfigureJson
@ActiveProfiles("test")
public class PatientControllerTest {

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PatientService patientService;

    @After
    public void tearDown() throws Exception {
        Mockito.verifyNoMoreInteractions(patientService);
    }

    @Test
    public void testEmpty() throws Exception {

        Mockito.doReturn(null).when(patientService).getList();

        MockHttpServletRequestBuilder getListRequest = get("/patient/list").
                accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(getListRequest)
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().json("[]"));

        Mockito.verify(patientService).getList();
    }

    @Test
    public void testList() throws Exception {

        List<Patient> expected = JSONHelper.readFromClassPath(mapper,
                "/controller/patient-list.json", new TypeReference<List<Patient>>(){});

        Mockito.doReturn(expected).when(patientService).getList();

        MockHttpServletRequestBuilder getListRequest = get("/patient/list").
                accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(getListRequest)
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().json(JSONHelper.writeAsString(mapper, expected)));

        Mockito.verify(patientService).getList();
    }

}
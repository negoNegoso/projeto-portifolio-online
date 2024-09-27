package com.fatec.siga.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.fatec.siga.model.service.SubjectServiceModel;
import com.fatec.siga.model.view.SubjectBindingModel;
import com.fatec.siga.model.view.SubjectViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.fatec.siga.anotation.PageTitle;
import com.fatec.siga.service.ClassroomService;
import com.fatec.siga.service.SubjectService;
import com.fatec.siga.service.TeacherService;
import com.fatec.siga.service.UserService;


@RestController
@RequestMapping("/subjects")
public class SubjectController extends BaseController {

    @Autowired
    private SubjectService subjectService;
    @Autowired
    private ClassroomService classroomService;
    @Autowired
    private UserService userService;
    @Autowired
    private TeacherService teacherService;

    @Autowired
    public SubjectController(ModelMapper modelMapper,
                             SubjectService subjectService,
                             ClassroomService classroomService,
                             UserService userService,
                             TeacherService teacherService) {
        super(modelMapper);
        this.subjectService = subjectService;
        this.classroomService = classroomService;
        this.userService = userService;
        this.teacherService = teacherService;
    }


    @GetMapping("/all/{classroomId}")
    public ResponseEntity<List<SubjectViewModel>> getAllSubjects(@PathVariable Long classroomId) {
        List<SubjectViewModel> subjects = getSubjects(classroomId);
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/add/{classroomId}")
    public ResponseEntity<Map<String, Object>> getAddSubjectInfo(@PathVariable Long classroomId) {
        Map<String, Object> response = new HashMap<>();
        response.put("teachers", teacherService.getAllTeachers());
        response.put("classroom", classroomService.getById(classroomId));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody SubjectBindingModel subjectBindingModel) {
        if (subjectService.subjectExists(subjectBindingModel.getSubject(), subjectBindingModel.getClassroomId())){
            return ResponseEntity.badRequest().body("The subject already exists.");
        }
        SubjectServiceModel serviceModel = modelMapper.map(subjectBindingModel, SubjectServiceModel.class);
        subjectService.addSubject(serviceModel);
        return ResponseEntity.ok("Subject added successfully.");
    }

    @GetMapping("/edit/{id}")
    @PageTitle(value = "Edit item")
    public ResponseEntity<SubjectBindingModel> editSubjectGet(@PathVariable Long id){
        SubjectServiceModel serviceModel = subjectService.getSubjectById(id);
        SubjectBindingModel bindingModel = modelMapper.map(serviceModel, SubjectBindingModel.class);
        return ResponseEntity.ok(bindingModel);
    }

    @GetMapping("/details/{subjectId}")
    // @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseEntity<SubjectServiceModel> details(@PathVariable Long subjectId){
        SubjectServiceModel subject = subjectService.getSubjectById(subjectId);
        return ResponseEntity.ok(subject);
    }

    @PutMapping("/edit")
    public ResponseEntity<String> editSubjectPut(@RequestBody SubjectBindingModel bindingModel){
        SubjectServiceModel serviceModel = modelMapper.map(bindingModel, SubjectServiceModel.class);
        subjectService.editSubject(serviceModel);
        return ResponseEntity.ok("Subject edited successfully.");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam Long id, @RequestParam Long classroomId){
        subjectService.deleteSubject(id);
        return ResponseEntity.ok("Subject deleted successfully.");
    }


    private List<SubjectViewModel> getSubjects(Long classroomId){
        return this.subjectService.getAllSubjectsByClassId(classroomId)
                .stream()
                .map(s-> modelMapper.map(s,SubjectViewModel.class))
                .collect(Collectors.toList());
    }
}

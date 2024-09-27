package com.fatec.siga.web.controller;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fatec.siga.anotation.PageTitle;
import com.fatec.siga.service.ClassroomService;
import com.fatec.siga.service.SubjectService;
import com.fatec.siga.service.TeacherService;
import com.fatec.siga.service.UserService;



@Controller
@RequestMapping("/subjects")
public class SubjectController extends BaseController {
    
    @Autowired
    private SubjectService subjectService;
    private final ClassroomService classroomService;
    private final UserService userService;
    private final TeacherService teacherService;

    @Autowired
    public SubjectController(ModelMapper modelMapper,
                             SubjectService subjectService,
                             ClassroomService classroomService,
                             UserService userService, TeacherService teacherService) {
        super(modelMapper);
        this.subjectService = subjectService;
        this.classroomService = classroomService;
        this.userService = userService;
        this.teacherService = teacherService;
    }

    @GetMapping("/all//{classroomId}")
    @PageTitle(value = "Subjects")
    public String subjects(@PathVariable Long classroomId, Model model) {
        model.addAttribute("classroom",classroomService.getById(classroomId));
        model.addAttribute("subjects",getSubjects(classroomId));
        return "subjects-all";
    }

    @GetMapping("/add/{classroomId}")
    @PageTitle(value = "Add an item")
    public String addSubjectGet(@PathVariable Long classroomId,Model model){
        model.addAttribute("teachers",teacherService.getAllTeachers());
        model.addAttribute("classroom",classroomService.getById(classroomId));
        if (model.getAttribute(BINDING_MODEL) == null) {
            model.addAttribute(BINDING_MODEL, new SubjectBindingModel());
        }
        return "subjects-add";
    }

    @PostMapping("/add")
    public String add(SubjectBindingModel subjectBindingModel, RedirectAttributes redirectAttributes) {
        if (subjectService.subjectExists(subjectBindingModel.getSubject(),subjectBindingModel.getClassroomId())){
            redirectAttributes.addFlashAttribute(ERROR,"The item exists");
            return redirect("/subjects/add/" + subjectBindingModel.getClassroomId());
        }
        SubjectServiceModel serviceModel = modelMapper.map(subjectBindingModel, SubjectServiceModel.class);
        subjectService.addSubject(serviceModel);
        return redirect("/subjects/all/" + subjectBindingModel.getClassroomId());
    }

    @GetMapping("/edit/{id}")
    @PageTitle(value = "Edit item")
    public String editSubjectGet(@PathVariable Long id,Model model){
        SubjectServiceModel serviceModel = subjectService.getSubjectById(id);
        SubjectBindingModel bindingModel = modelMapper.map(serviceModel, SubjectBindingModel.class);
        model.addAttribute("teachers",teacherService.getAllTeachers());
        if (model.getAttribute(BINDING_MODEL) == null){
            model.addAttribute(BINDING_MODEL,bindingModel);
        }
        return "subjects-edit";
    }

    @GetMapping("/details/{subjectId}")
    // @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public String details(@PathVariable Long subjectId,Model model){
        SubjectServiceModel subject = subjectService.getSubjectById(subjectId);
        model.addAttribute("subject",subject);
        return "subjects-details";
    }

    @PutMapping("/edit")
    public String editSubjectPut(SubjectBindingModel bindingModel){
        SubjectServiceModel serviceModel = modelMapper.map(bindingModel, SubjectServiceModel.class);
        subjectService.editSubject(serviceModel);
        return redirect("/subjects/all/" + bindingModel.getId());
    }

    @DeleteMapping("/delete")
    public String delete(Long id,Long classroomId){
        subjectService.deleteSubject(id);
        return redirect("/subjects/all/" + classroomId);
    }


    private List<SubjectViewModel> getSubjects(Long classroomId){
        return this.subjectService.getAllSubjectsByClassId(classroomId)
                .stream()
                .map(s-> modelMapper.map(s,SubjectViewModel.class))
                .collect(Collectors.toList());
    }
}

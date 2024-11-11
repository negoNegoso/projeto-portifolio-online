import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Student/Home/Home';
import Login from './pages/Student/Login/Login';
import Query from './pages/Student/Query/Query';
import TeacherLogin from './pages/Professor/TeacherLogin/TeacherLogin';
import Absence from './pages/Student/Query/Absence/Absence';
import RollCall from './pages/Professor/RollCall/RollCall';
import Students from './pages/Professor/Studants/Students';
import Grade from './pages/Student/Query/Grade/Grade';
import Class from './pages/Student/Query/Class/Class';
import TeacherHome from './pages/Professor/TeacherHome/TeacherHome';
import AcademyHome from './pages/Academy/AcademyHome/AcademyHome';
import Registrations from './pages/AdministrativeOffice/Registers/Register';
import Information from './pages/AdministrativeOffice/Informations/Informations';
import Information2 from './pages/AdministrativeOffice/Informations/Informations2';
import SchoolReports from './pages/Student/Query/SchoolReport/SchoolReport';
import ProfessorSettings from './pages/Professor/Settings/ProfessorSettings';
import StudentSettings from './pages/Student/Settings/StudentSettings';
import AcademySettings from './pages/Academy/Settings/AcademySettings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/home" element={<Home />} />
        <Route path="/student/query" element={<Query />} />
        <Route path="/professor/teacherLogin" element={<TeacherLogin />} />
        <Route path="/student/query/absence" element={<Absence />} />
        <Route path="/professor/rollcall" element={<RollCall />} />
        <Route path="/professor/students" element={<Students />} />
        <Route path="/student/query/grade" element={<Grade />} />
        <Route path="/student/query/class" element={<Class />} />
        <Route path="/professor/teacherHome" element={<TeacherHome/>}/>
        <Route path="/academy/academyHome" element={<AcademyHome/>}/>
        <Route path="/administrativeOffice/register" element={<Registrations />} />
        <Route path="/administrativeOffice/generalInfo" element={<Information />} />
        <Route path="/administrativeOffice/personalInfo" element={<Information2 />} />
        <Route path="/student/query/schoolReport" element={<SchoolReports />} />
        <Route path="/professor/settings" element={<ProfessorSettings/>} />
        <Route path="/student/settings" element={<StudentSettings/>} />
        <Route path="/academy/settings" element={<AcademySettings/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

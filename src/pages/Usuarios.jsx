import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { AddUserModal } from "../components/Modals/AddUserModal";
import { useSchoolContext } from "../context/SchoolContext";
import * as Icon from "react-feather";
import { useState, useEffect } from "react";

export function Usuarios() {
  const { courses, getCourses, students, getStudents, users, getUsers, teachers, getTeachers } = useSchoolContext();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [courseSelected, setCourseSelected] = useState(courses[0]);
  const [searchStudent, setSearchStudent] = useState("");

  /*   useState(() => {
    getUsers();
  }, [users]); */

  useEffect(() => {
    getCourses();
    getStudents();
    getTeachers();
  }, [users]);

  const courseStudents = students.filter((student) => student.id_curso === courseSelected?.id_curso);
  const courseTeacher = teachers.find((teacher) => teacher.Curso.some((curso) => curso.id_curso == courseSelected?.id_curso));

  const filteredStudents = courseStudents.filter(
    (student) =>
      student.usuario.nombre.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.usuario.apellido.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <>
      <NavigationMenu selected="usuarios" />
      <main>
        <h2 className="page-title">Gestionar Usuarios</h2>

        <Table
          title={`Alumnos ${courseSelected ? courseSelected.nombre : ""}`}
          showOptions={false}
          handleSearch={(e) => setSearchStudent(e.target.value)}
        >
          <ul className="cursos-list">
            {courses &&
              courses.map((course) => (
                <li
                  onClick={() => setCourseSelected(course)}
                  key={course.id_curso}
                  className={courseSelected?.id_curso === course.id_curso ? "selected" : ""}
                >
                  {course.nombre}
                </li>
              ))}
          </ul>
          <div className="row header user">
            <span>Rol</span>
            <span>Apellido</span>
            <span>Email</span>
          </div>

          {courseTeacher ? (
            <div className="row user" title="Profesor">
              <Icon.Award />
              <span>
                {courseTeacher.usuario.apellido} {courseTeacher.usuario.nombre}
              </span>
              <span>{courseTeacher.usuario.email}</span>
            </div>
          ) : null}

          {students &&
            filteredStudents.map((student) => (
              <div className={`row user`} key={student.id_usuario} onClick={() => setStudentSelected(student)}>
                <span> </span>
                <span>
                  {student.usuario.apellido} {student.usuario.nombre}
                </span>
                <span>{student.usuario.email}</span>
              </div>
            ))}
        </Table>
      </main>
    </>
  );
}

/* 
<Table
          title="Usuarios"
          showOptions={true}
          add={() => setOpenAddModal(true)}
        >
          <div className="row header user">
            <span></span>
            <span>Nombre</span>
            <span>Email</span>
          </div>

          {users.map((user) => (
            <div
              className="row user"
              key={user.id_usuario}
              title={user.id_rol == 2 ? "Profesor" : "Alumno"}
            >
              <span>{user.id_rol == 2 ? <Icon.Award /> : null}</span>
              <span>
                {user.nombre} {user.apellido}
              </span>
              <span>{user.email}</span>
            </div>
          ))}
        </Table>

        <AddUserModal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
         */

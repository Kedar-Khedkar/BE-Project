import React, {useEffect, useState} from "react";
import StudentAccount from "../component/User Account/StudentAccount";
import axios from "axios";
import NonStudentAccount from "../component/User Account/NonStudentAccount";

export default function MyAccount (){
    const [userData, setUserData] = useState(undefined);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        axios.get(`http://localhost:5000/users/my-account`, {withCredentials: true}).then((res) => {
          setUserData(res.data.objects);
        });
      }, []);

      return(
        <>
        {userData && user.role === 'student' &&<StudentAccount data={userData}></StudentAccount>}
        {userData && user.role !== 'student'&& <NonStudentAccount data={userData}></NonStudentAccount>}
        </>
      )

}
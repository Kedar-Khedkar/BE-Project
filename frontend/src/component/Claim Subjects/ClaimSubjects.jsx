import { Button, MultiSelect } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import UnclaimSubjects from './UnclaimSubjects';

export default function ClaimSubjects(props) {
 const [ClaimSubjects, setClaimSubjects] = useState([]);
 const [alreadyClaimed, setAlreadyClaimed] = useState([]);

 useEffect(()=>{
    axios.get("http://localhost:5000/faculty/", {withCredentials:true})
    .then((res)=>{
        setAlreadyClaimed(res.data.objects);
    })
 },[])

 const handleSubmit = ()=>{
    console.log(ClaimSubjects);
    axios.post("http://localhost:5000/faculty/claimSubjects", {subIds:ClaimSubjects}, {withCredentials:true})
    .then((res)=>{
            showNotification({
              title: "Success!",
              message: "Subject claimed successfully",
              color: "teal",
              disallowClose: false,
            })
            console.log(res);
    }).catch(
        function(err){
            showNotification({
              title: "Failed!",
              message: "Something went wrong.",
              color: "red",
            })
            console.log(err)
          }
    )
 }
  return (
    <>
    <h2>Claim Subjects</h2>
    <MultiSelect onChange={setClaimSubjects}
    data={props.data}
      label="Select the subjects to claim"
      placeholder="Select the subjects"
    />
    <Button mt={5} onClick={handleSubmit}>Claim</Button>

    <h2>Unclaim Subjects</h2>
    <UnclaimSubjects data={alreadyClaimed}></UnclaimSubjects>
    </>

  );
}

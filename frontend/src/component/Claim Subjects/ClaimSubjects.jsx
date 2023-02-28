import { Button, MultiSelect } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';


export default function ClaimSubjects(props) {
 const [ClaimSubjects, setClaimSubjects] = useState([]);

 const handleSubmit = ()=>{
    console.log(ClaimSubjects);
    axios.post("http://localhost:5000/faculty/claimSubjects", {subIds:ClaimSubjects}, {withCredentials:true})
    .then((res)=>{
        console.log(res)
    })
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
    </>

  );
}

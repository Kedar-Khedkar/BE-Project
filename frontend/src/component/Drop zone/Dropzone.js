import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Card,
  CardActionArea,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from "@mui/styles";
import pattern from '../../assets/Images/ttten.svg'
const useStyles = makeStyles((theme) => ({
  section: {
    height: "100vh",
    backgroundImage: `url(${pattern})`,
    backgroundSize: "cover",
  }}))
  
  const axios = require("axios");

export default function DropzoneBox() {
    const classes = useStyles();
  const onDrop = useCallback((acceptedFile) => {
    let formData = new FormData();
    formData.append('file', acceptedFile)
    axios.post("http://localhost:5000/users/upload", formData, {headers:{
      'Content-Type': 'multipart/form-data'
    }}).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      " application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
  });
  return (
    <>
    <div className={classes.section} >

        <Container maxWidth="md">
          <Box
            sx={{
                display: "flex",
                "& > :not(style)": {
                    m: 1,
                    mt:20,
                    width: 800,
                    height: 300,
                },
            }}
            >
            
            <Card>
                <div {...getRootProps()} >
              <input {...getInputProps()} />
                <Stack justifyContent="center" alignItems="center">
                  <CreateNewFolderIcon sx={{ fontSize: 150 }} />
                  {isDragActive ? (
                    <Typography variant="h6"  align="center">
                      Drop the files here ...
                    </Typography>
                  ) : (
                      <Typography variant="h6"  align="center">
                      Drag 'n' drop some files here, or click to select files
                    </Typography>
                  )}
                </Stack>
      </div>
             
            </Card>
          </Box>
        </Container>
                  </div>
    </>
  );
}

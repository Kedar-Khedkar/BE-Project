import { LoadingOverlay, Center, Container, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import React from "react";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import DropzoneButton from "../Drop zone/Dropzone";
import { IconPdf, IconCheck } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { ImageWithRectangles } from "../ImageCrop/ImageCropper";
import MarkExtractExcel from "../Spreadsheets/MarkExtract";

export default function ExtractMarks() {
  const [active, setActive] = useState(0);
  const [imageSelectorProps, setImageSelectorProps] = useState(undefined);
  const [extractedData, setExtractedData] = useState(undefined);
  const [visible, toggle] = useState(false);
  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
    toggle(false);
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const handleResponse = (res) => {
    console.log(res);
    setImageSelectorProps({ ...res.data.objects, overlay: toggle });
    nextStep();
  };
  const getExtractedData = (response) => {
    console.log(response);
    setExtractedData(response);
    nextStep();
  };
  return (
    <>
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <Center>
        <Title m={12} size={"h3"}>
          Follow these 3 simple steps
        </Title>
      </Center>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Upload PDF" description="Upload pdf to convert">
          <Container>
            <Center>
              <Title m={12}>Upload the PDF To Extract Data</Title>
            </Center>
            <DropzoneButton
              overlay={toggle}
              uploadLink={"http://localhost:5000/marks/upload"}
              onResponse={handleResponse}
              icon={<IconPdf color="#1a7fdb" size={36} />}
              accept={PDF_MIME_TYPE}
            />
          </Container>
        </Stepper.Step>
        <Stepper.Step
          label="Mark sections"
          description="Mark sections to extract data"
        >
          <Center>
            <Title m={12}>Draw rectangle(s) over image to extract data</Title>
          </Center>
          {imageSelectorProps && (
            <ImageWithRectangles
              image={imageSelectorProps}
              response={getExtractedData}
            />
          )}
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Extracted Data">
          Full extracted table
          <MarkExtractExcel data={extractedData} />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}

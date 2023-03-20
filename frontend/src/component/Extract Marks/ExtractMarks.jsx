import { Container } from "@mantine/core";
import React from "react";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import DropzoneButton from "../Drop zone/Dropzone";
import { IconPdf, IconCheck } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { ImageWithRectangles } from "../ImageCrop/ImageCropper";

export default function ExtractMarks() {
  const [active, setActive] = useState(0);
  const [imageSelectorProps, setImageSelectorProps] = useState(undefined);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const handleResponse = (res) => {
    console.log(res);
    setImageSelectorProps(res.data.objects);
    nextStep();
  };
  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Upload PDF" description="Upload pdf to convert">
          <Container>
            <DropzoneButton
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
          {imageSelectorProps && (
            <ImageWithRectangles props={imageSelectorProps} />
          )}
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Extracted Data">
          Full extracted table
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

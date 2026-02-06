import { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Group,
  ActionIcon,
  Table,
  Fieldset,
  FileInput,
  TagsInput,
  Stack,
  Text,
  Select
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";
import axios from "axios";

export default function DrPrescriptionModal({ opened, onClose,appointmentId }) {
  const [tabletName, setTabletName] = useState([]);
  const [dose, setDose] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [timePeriod, setTimePeriod] = useState("")
  const [report, setReport] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}

  const [prescriptions, setPrescriptions] = useState([]); 
  // { "2026-01-30": [ {medicine, dose, quantity, file} ] }

  // const formatDate = (d) => new Date(d).toISOString().split("T")[0];

  const handleAddMedicine = () => {
  if (!tabletName.length || !dose || !quantity) return;

  const newEntry = {
    tabletName,
    dose,
    quantity,
    timePeriod,
    // report: report || "",
  };

  setPrescriptions((prev) => [...prev, newEntry]); // 👈 just push into array

  // Reset fields
  setTabletName([]);
  setDose("");
  setQuantity(1);
  setTimePeriod("");
  // setReport(null);
};

const handleDelete = (index) => {
  setPrescriptions((prev) => prev.filter((_, i) => i !== index));
};
 

  const handlePrescription = async()=>{
    try{

    const formData = new FormData();

    formData.append("appointmentId", appointmentId);
    formData.append("prescription", JSON.stringify(prescriptions));

    if (report) {
      formData.append("report", report);
    }
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/doctor/add-prescription`,formData,headers)
     setTabletName([])
     setDose("")
     setQuantity(1)
     setTimePeriod("")
     setPreviewFile(null)
     setReport(null)
     setPrescriptions([])
     toast.success(res.data?.msg)
     onClose()
    }catch(err){
      toast.error(err.response?.data?.msg)
    }
  }

  return (
    <>
      {/* Main Prescription Modal */}
      <Modal opened={opened} onClose={onClose} title="Add Prescription" size="xl">
        <Stack>
          {/* Input Section */}
          <Group grow align="end">
            <TagsInput
              label="Search Medicine"
              placeholder="Type medicine name..."
              data={['Paracetamol','Accelofenic','NemoPara','Tramadol','Neumosclide','Etodal','Magran-D']}
              value={tabletName}
              onChange={setTabletName}
            />
            <TextInput
              label="Dose"
              placeholder="e.g. 500mg"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />

            <NumberInput
              label="Quantity"
              min={1}
              value={quantity}
              onChange={setQuantity}
            />
            <Select
              label="Prescription Period"
              placeholder="select one of them"
              data={['3 Days', '5 Days', '7 Days', '10 Days', '15 Days','20 Days','30 Days']}
              value={timePeriod}
              onChange={setTimePeriod}
            />

            <Button leftSection={<IconPlus size={16} />} onClick={handleAddMedicine}>
              Add
            </Button>
          </Group>
          <FileInput
              label="Upload Report"
              placeholder="Image or PDF"
              value={report}
              onChange={setReport}
              accept="image/*,application/pdf"
          />

          {/* Prescription List by Date */}
         <Fieldset legend="Prescriptions">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Medicine</Table.Th>
                  <Table.Th>Dose</Table.Th>
                  <Table.Th>Qty</Table.Th>
                  <Table.Th>Time Period</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>

                <Table.Tbody>
                  {prescriptions.map((item, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{item.tabletName.join(", ")}</Table.Td>
                      <Table.Td>{item.dose}</Table.Td>
                      <Table.Td>{item.quantity}</Table.Td>
                      <Table.Td>{item.timePeriod}</Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="red"
                          onClick={() => handleDelete(index)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Fieldset>
        </Stack>
        <Button mt={20} disabled={!prescriptions.length} onClick={handlePrescription}>Save</Button>
      </Modal>

      {/* File Preview Modal */}
      <Modal
        opened={!!previewFile}
        onClose={() => setPreviewFile(null)}
        title="Report Preview"
        size="lg"
      >
        {previewFile?.includes("pdf") ? (
          <iframe
            src={previewFile}
            width="100%"
            height="500px"
            title="PDF Preview"
          />
        ) : (
          <img
            src={previewFile}
            alt="Report"
            style={{ width: "100%", borderRadius: 8 }}
          />
        )}
      </Modal>
    </>
  );
}

import {
  Modal,
  Fieldset,
  Table,
  Button,
  Text,
  Stack,
  Group,
} from "@mantine/core";
import { useState } from "react";

function PrescriptionHistoryModal({ openedPresHist, onClosePresHist, prescriptions }) {
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState("");
  return (
    <Modal
      opened={openedPresHist}
      onClose={onClosePresHist}
      title="Prescription History"
      size="xl"
      centered
    >
      <Stack>
        {prescriptions?.length === 0 && (
          <Text c="dimmed" ta="center">
            No prescriptions available
          </Text>
        )}

        {prescriptions?.map((presc) => (
          <Fieldset
            key={presc._id}
            legend={`Created At: ${new Date(presc.createdAt).toLocaleString(
              "en-IN"
            )}`}
          >
            <Stack>
              <Table striped highlightOnHover withBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Medicine</Table.Th>
                    <Table.Th>Dose</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Time Period</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {presc.prescription.map((med, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{med.tabletName.join(", ")}</Table.Td>
                      <Table.Td>{med.dose}</Table.Td>
                      <Table.Td>{med.quantity}</Table.Td>
                      <Table.Td>{med.timePeriod}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              
              {/* Report Button */}
              {presc.report && (
                 <Button
                   fullWidth
                   mt="sm"
                   style={{ backgroundColor: "orangered" }}
                   onClick={() => {
                     setSelectedReport(presc.report);
                     setReportModalOpen(true);
                   }}
                 >
                   View Report
                 </Button>
               )}
            </Stack>
          </Fieldset>
        ))}
      </Stack>
      <Modal
            opened={reportModalOpen}
            onClose={() => setReportModalOpen(false)}
            title="Prescription Report"
            size="lg"
            centered
      >
           {selectedReport ? (
            <iframe
              src={`${import.meta.env.VITE_BACKEND_URI}/${selectedReport}`}
              title="Report Preview"
              width="100%"
              height="500px"
              style={{ border: "none", borderRadius: "8px" }}
            />
        ) : (
          <Text>No report available</Text>
        )}
       </Modal>
    </Modal>
  );
}

export default PrescriptionHistoryModal;

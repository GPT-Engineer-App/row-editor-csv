import React, { useState } from 'react';
import { Container, VStack, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState('edited_data.csv');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setHeaders(Object.keys(results.data[0]));
          setData(results.data);
        },
      });
    }
  };

  const handleAddRow = () => {
    setData([...data, {}]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleCellChange = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.value;
    setData(newData);
  };

  return (
    <Container centerContent maxW="container.xl" py={10}>
      <VStack spacing={4} width="100%">
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        <Table variant="simple">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <Td key={colIndex}>
                    <Input value={row[header] || ''} onChange={(e) => handleCellChange(e, rowIndex, header)} />
                  </Td>
                ))}
                <Td>
                  <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => handleRemoveRow(rowIndex)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button leftIcon={<FaPlus />} onClick={handleAddRow}>
          Add Row
        </Button>
        <CSVLink data={data} headers={headers} filename={fileName}>
          <Button>Download CSV</Button>
        </CSVLink>
      </VStack>
    </Container>
  );
};

export default Index;
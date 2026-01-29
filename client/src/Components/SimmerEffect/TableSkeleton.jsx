import { Skeleton } from '@mui/material'
import { Table } from '@mantine/core'
import React from 'react'

const TableSkeleton = () => {
  return Array(7).fill(0).map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td><Skeleton height={60} /></Table.Td>
      <Table.Td><Skeleton height={60} /></Table.Td>
      <Table.Td><Skeleton height={60} /></Table.Td>
      <Table.Td><Skeleton height={60} /></Table.Td>
      <Table.Td><Skeleton height={60} /></Table.Td>
      <Table.Td><Skeleton height={60} /></Table.Td>
      <Table.Td><Skeleton height={60} /></Table.Td>
    </Table.Tr>
  ));
}

export default TableSkeleton
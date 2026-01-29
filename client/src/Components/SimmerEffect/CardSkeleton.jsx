import React from 'react'
import { Skeleton } from '@mantine/core';

const CardSkeleton = () => {
  return (
    <div style={{width:"270px",height:"400px",border:"solid 1px rgb(199, 199, 199)",borderRadius:"7px",padding:"7px"}}>
        <Skeleton height={250}  mb="xl" />
        <Skeleton height={12} radius="xl" />
        <Skeleton height={12} mt={6} radius="xl" />
        <Skeleton height={12} mt={6} width="70%" radius="xl" />
        <div style={{width:"100%", display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Skeleton height={40} mt={10} circle />
            <Skeleton height={40} mt={10} width="60%" radius="xl" />
        </div>
    </div>
  )
}

export default CardSkeleton
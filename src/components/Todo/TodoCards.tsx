import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'
import { Todo } from '@/types/Task'

const TodoCards = (task:any) => {
  return (
    <Card>
        <CardBody>
        <Text>{task}</Text>
        </CardBody>
  </Card>
  )
}

export default TodoCards
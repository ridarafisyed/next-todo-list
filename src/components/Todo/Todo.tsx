"use client"

import { useState } from 'react'
import { Card, CardHeader, CardBody, Text, Flex, Box, Checkbox } from '@chakra-ui/react'
import groupBy from 'lodash.groupby'
import { Container, Input, Heading } from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

import {
  Button,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'


import { IconButton } from '@chakra-ui/react'
import { FaPlus, FaTrash, FaEdit, FaTasks } from 'react-icons/fa';
import {Todo} from "../../types/Task"

let today = new Date().toJSON().slice(0,10)

const todoTask:Todo[] = [
  {id:1, task:"task 1", complete:false, date: today, description:"" },
  {id:2, task:"task 2", complete:false, date: new Date(2023,27,1).toJSON().slice(0,10), description:"" },
  {id:3, task:"task 3", complete:false, date: new Date(2023,27,1).toJSON().slice(0,10), description:"" },
  {id:5, task:"task 4", complete:false, date: new Date(2023,27,1).toJSON().slice(0,10), description:"" }

]


const TodoList: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>(todoTask)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const task = e.currentTarget.task.value
    const date = String(new Date(e.currentTarget.date.value).toJSON().slice(0,10))
    const description = e.currentTarget.description.value
    const id = todos.length + 1
    setTodos([...todos, { id, task, date ,description, complete: false }])
    e.currentTarget.reset()
  }

  const handleComplete = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    )
  }
  const groupedTodos = groupBy(todos, todo => todo.date)
  const dates = Object.keys(groupedTodos)

  const handleRemove = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEdit = (id: number, updatedTask: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, task: updatedTask }
        }
        return todo
      })
    )
  }

  return (

    <Container alignContent="center">
      <Flex margin={5}>
      <Heading> TODO - List</Heading>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
      </Flex>
      <IconButton aria-label='Search database' icon={<FaPlus />} onClick={onOpen} colorScheme='green' isRound={true} ></IconButton>
      
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Task</FormLabel>
              <Input name="task"type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input name="date" type='date' defaultValue={today} />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Textarea name="description" />
            </FormControl>
            
          </ModalBody>
          

          <ModalFooter>
            <IconButton aria-label='Search database' icon={<FaPlus />} type="submit" colorScheme='green' isRound={true}></IconButton>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
     
      {dates.map(date => (
        <div key={date}>
          
          <Card margin={2} style={date === today?{color:"red", backgroundColor:"lightblue"}:{color:"gray"} }>
          <CardHeader>
            <Flex>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box>
                  <Heading size='sm'>{date === today? "Today": date}</Heading>
                </Box>
              </Flex>
          
            </Flex>
          </CardHeader>
          <CardBody>
            {groupedTodos[date].map(todo => (
              <Flex key={todo.id} marginBottom={3} style={todo.complete ? {color: "green", textTransform:"capitalize", textDecorationLine:"line-through" }:{color:"black", textTransform:"capitalize"}}>
                <Checkbox margin={1} onChange={() => handleComplete(todo.id)}/>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box>
                <Text key={todo.task} >
                    {todo.task}
                  </Text>
                </Box>
              </Flex>
            <IconButton aria-label='Search database' icon={<FaEdit />} type="submit" colorScheme='blue' isRound={true} marginInline={2}></IconButton>
            <IconButton aria-label='Search database' icon={<FaTrash />} type="submit" onClick={()=> handleRemove(todo.id)} colorScheme='red' isRound={true} marginInline={2}></IconButton>
            </Flex>
              
            ))}
            </CardBody>
          </Card>
        </div>
      ))}
       </Container>
  )
      
      
  
}

export default TodoList



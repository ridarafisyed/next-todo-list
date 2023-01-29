"use client"

import { useState } from 'react'
import { Card, CardHeader, CardBody, Text, Flex, Box, Checkbox, Spacer } from '@chakra-ui/react'
import groupBy from 'lodash.groupby'
import { Container, Center, Input, Heading } from '@chakra-ui/react'

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
  Textarea,
  FormControl,
  FormLabel,
 
} from '@chakra-ui/react'


import { IconButton } from '@chakra-ui/react'
import { FaPlus, FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import {Todo} from "../../types/Task"

let today = new Date().toJSON().slice(0,10)

const todoTask:Todo[] = [

]

const TodoList: React.FC = () => {
  
  const [value, setValue] = useState('')
  const handleChange = (value:string) => setValue(value)

  


  const [todos, setTodos] = useState<Todo[]>(todoTask)
  const { isOpen:isAddOpen, onOpen:onAddOpen, onClose:onAddClose } = useDisclosure()
  const { isOpen:isEditOpen, onOpen:onEditOpen, onClose:onEditClose } = useDisclosure()
  const groupedTodos = groupBy(todos, todo => todo.date)
  const dates = Object.keys(groupedTodos)

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


  const handleRemove = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEdit = (id:number, updatedTask:string) => {
    setTodos(
      (oldList) => 
      (oldList.map((task) => {
        if (task.id === id) {
          task.task = updatedTask;
        }
        return task;
      }))
    )
  
  }
  
  return (
    <Container style={{marginTop:"5em"}}>
      <Card style={{padding:"2em", boxShadow: "#3d3d3d 0px 7px 29px 0px"}}>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
      {/* bg='red.400' */}
        <Box p='4' > 
        <Heading>ToDo - List</Heading>
        </Box>
        <Spacer />
        {/* bg='green.400' */}
        <Box p='4'>
        <IconButton aria-label='Search database' icon={<FaPlus />} onClick={onAddOpen} colorScheme='green' isRound={true} ></IconButton>
        </Box>
      </Flex>
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Task</FormLabel>
              <Input name="task"type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input name="date" type='date' defaultValue={today} />
            </FormControl>
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea name="description" size='sm'/>
            </FormControl>     
          </ModalBody>
          <ModalFooter>
            <IconButton aria-label='Search database' icon={<FaPlus />} type="submit" colorScheme='green' isRound={true}></IconButton>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
     <Text fontSize="xl" as="b"color="gray.400">Upcoming Tasks</Text>
     <hr/>
      {dates.map(date => (
        <div key={date}>
          <Card margin={2}>
          <CardHeader>
            <Flex>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box style={date === today?{color:"red"}:{color:"gray"} }>
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
              <IconButton aria-label='Search database' icon={<FaEdit />} onClick={onEditOpen} colorScheme='blue' isRound={true} ></IconButton>
            <IconButton aria-label='Search database' icon={<FaTrash />} onClick={()=>handleRemove(todo.id)}  colorScheme='red' isRound={true} marginInline={2}></IconButton>
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="xs">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel>Task</FormLabel>
                    <Input
                      value={value}
                      onChange={(e)=>handleChange(e.currentTarget.value)}
                      placeholder={todo.task}
                      
                    />
                    {/* <Input name="taskValue" type='text' value={taskValue} onChange={()=>setTaskValue(taskValue)}  defaultValue={todo.task} /> */}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input name="date" type='date' defaultValue={todo.date} />
                  </FormControl>
                </ModalBody>
                
                <ModalFooter>
                  <IconButton aria-label='Search database' icon={<FaSave />} onClick={()=>handleEdit(todo.id, value)} colorScheme='green' isRound={true}></IconButton>
                </ModalFooter>
              
              </ModalContent>
            </Modal>
            </Flex>
              
            ))}
            </CardBody>
          </Card>
        </div>
      ))}
      </Card>
       </Container>
  )
      
      
  
}

export default TodoList



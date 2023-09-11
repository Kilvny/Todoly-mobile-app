import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import Myodal from './components/Modal';
import { TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [taskText, setTaskText] = useState()
  const [tasks, setTasks] = useState([
    "task 1"
  ])

  const hanldeAddTask = () => {
    
    if(isEmptyOrSpaces(taskText)) {
        return 
    } 

    Keyboard.dismiss() // close the keyboard 

    setTasks([...tasks, taskText])
    setTaskText("")
  }

  const onTaskCompleted = (index) => {
    let tasksCopy = [...tasks]
    tasksCopy.splice(index, 1)
    setTasks(tasksCopy)
  }


  return (
    <View style={styles.container}>
      {/* Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text> 
        
        {/* tasks will go here */}
        
        <View style={styles.items}>
          {
          tasks.map((task, index) => 

          <TouchableOpacity key={index} onPress={()=>onTaskCompleted(index)}>
            <Task text={task} />
          </TouchableOpacity>
          
          )}
        </View>
      </View>
        {/* <Myodal />    */}
      {/* <StatusBar style="auto" /> */}

      {/* //* add a new Task section*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder='Add a new task' value={taskText} onChangeText={text => setTaskText(text)}/>

        <TouchableOpacity onPress={() => hanldeAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addText: {},
  });

    
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

async function getTasks() {
    let res = await fetch("URL")
    let tasks = await res.json()
    return tasks
}

async function postTask(task) {
// todo: waiting implementation
}
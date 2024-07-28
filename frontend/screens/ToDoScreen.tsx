import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import api from '../services/api';
import ToDoItem from '../components/ToDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDoScreen = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<{ _id: string; text: string, completed: boolean }[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchTodos = async () => {
    try {
      const response: any = await api.get('/todos/getAll');
      setTodos(response.data["data"]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch todos');
    }
  };

  const handleAdd = async () => {
    try {
      await api.post('/todos/create', { text });
      setText('');
      fetchTodos();
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/todos/delete/${id}`);
      fetchTodos();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete todo');
    }
  };

  const loadMoreTodos = async () => {
    setIsLoadingMore(true);
    try {
      const response: any = await api.get('/todos/getAll'); // Adjust the endpoint as needed
      setTodos(response.data["data"]);
    } catch (error) {
      Alert.alert('Error', 'Failed to load more todos');
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await api.put(`/todos/update/${id}`, { completed });
      fetchTodos(); // Refresh todos after toggling completion
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New to-do"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add To-Do" onPress={handleAdd} />
      <ScrollView>
        {todos.map(todo => (
          <ToDoItem key={todo._id} id={todo._id} text={todo.text} onDelete={handleDelete}
            completed={todo.completed}
            onToggleComplete={handleToggleComplete}
            loadMoreTodos={loadMoreTodos} />
        ))}
        {isLoadingMore && <Text>Loading more todos...</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default ToDoScreen;

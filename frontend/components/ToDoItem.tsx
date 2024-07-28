import React, { useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import CheckBox from 'expo-checkbox';

interface ToDoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  loadMoreTodos: () => void
}

const ToDoItem: React.FC<ToDoItemProps> = ({ id, text, completed, onToggleComplete, onDelete, loadMoreTodos }) => {

  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    console.log('Press in detected');
    longPressTimeout.current = setTimeout(() => {
      console.log('Long press detected, loading more todos');
      loadMoreTodos();
    }, 2000); // 1 second threshold for long press
  };

  const handlePressOut = () => {
    if (longPressTimeout.current) {
      console.log('Press out detected, clearing timeout');
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={styles.container}>
      <CheckBox value={completed} onValueChange={(newValue) => onToggleComplete(id, newValue)} />
      <Text style={completed ? styles.completedText : styles.text}>{text}</Text>
        <TouchableOpacity onPress={() => onDelete(id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteText: {
    color: 'red',
  },
  text: {
    flex: 1,
    marginHorizontal: 10,
  },
  completedText: {
    flex: 1,
    marginHorizontal: 10,
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default ToDoItem;

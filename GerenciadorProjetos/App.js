import React, {useState, useEffect} from 'react';
import { CheckBox, Overlay } from 'react-native-elements';
import axios from "axios";

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Background from "./src/background.jpg"
import Add from "./src/add.png"
import Close from "./src/close.png"

export default function App() {
  const [projetos, setProjetos] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [novaTarefa, setNovaTarefa] = useState("")

  useEffect( () => {
    async function buscarProjetos(){
      const dados = await axios.get("http://192.168.0.5:3333/projects")
      setProjetos(dados.data)
      console.log(projetos)
    }

    buscarProjetos()
  }, [])

  function modalTarefa(){
      setOverlay(true)
  }

  function fecharModalTarefa(){
    setOverlay(false)
  }

  function adicionarTarefa(){
    console.log(novaTarefa)
    axios.post("http://192.168.0.5:3333/projects/", {"name": novaTarefa})
    setOverlay(false)
  }

  return (
  

    <ImageBackground source={Background} style={styles.safe}>
      <ScrollView>
        <View style={styles.novo}>
          <Text style={styles.titulo}>Gerenciador de Projetos</Text>
        </View>

        <TouchableOpacity onPress={modalTarefa}>
          <Image style={styles.adicionarTarefa} source={Add}></Image>
        </TouchableOpacity>

        <Overlay height={145} windowBackgroundColor={"rgba(0, 0, 0, .3)"} isVisible={overlay}>
          <TouchableOpacity onPress={fecharModalTarefa}>
            <Image source={Close} style={styles.overlayClose}></Image>
          </TouchableOpacity>
        
          <TextInput value={novaTarefa} onChangeText={(value) => {setNovaTarefa(value)}} value={novaTarefa}
          style={styles.overlayInput} placeholder={"Digite o nome do projeto"}></TextInput>

          <TouchableOpacity style={styles.overlayButton} onPress={adicionarTarefa}>
            <Text style={styles.overlayText}>Adicionar Tarefa</Text>
          </TouchableOpacity>
        </Overlay>
      
        
        {(projetos.map(projeto => (
          <View key={projeto.id} style={styles.projectBlock}>
            <ScrollView style={styles.block}>
              <Text style={styles.tituloProjeto}>{projeto.name}</Text>
              {(projeto.tasks.map(tarefa => (
                <CheckBox 
                containerStyle={styles.checkboxContainer} 
                title={tarefa} 
                uncheckedIcon='circle'
                checkedIcon="circle.dot"
                textStyle={styles.checkboxText}>
                </CheckBox>
              )))}
             
            </ScrollView>
          </View>
        )))}
      </ScrollView>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#dedede",
  },
  projectBlock: {
  },
  block: {
    margin: 30,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 5,
  },
  titulo: {
    marginTop: 15,
    marginLeft: 35,
    fontSize: 40,
    color: "black",
    fontFamily: "Roboto",
  },
  tituloProjeto: {
    marginTop: 2,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  tarefas: {
    color: "#8eb6de",
    marginLeft: 45,
    fontSize: 20,
  },
  checkboxContainer: {
    height: 15,
    marginBottom: 10,
  },
  checkboxText: {
    color: "#8eb6de",
    fontSize: 17,
  },
  novo: {
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    width: 412,
    height: 80,
    borderWidth: 1,
    borderColor: 'rgba(250, 250, 250, 0.8)',
  },
  adicionarTarefa: {
    alignSelf: "center",
    marginTop: 10,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'rgba(250, 250, 250, 1.0)',
    borderColor: "white",
  },
  overlayButton: {
    marginTop: 15,
    borderRadius: 30,
    borderWidth: 1,
    width: 170,
    alignSelf: "center",
  },
  overlayText: {
    paddingLeft: 10,
    fontSize: 25,
  },
  overlayInput: {
    borderWidth: 1,
    borderColor: "#dedede"
  },
  overlayClose: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  
  
})


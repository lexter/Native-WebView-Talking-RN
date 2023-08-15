/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  Pressable,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { WebView } from 'react-native-webview';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const webView = useRef<WebView>(null);

  const isDarkMode = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onMessage(event: any) {
    let data = JSON.parse(event.nativeEvent.data);
    let { message, action } = { ...data };
    console.log( message );
    console.log( action );
    switch (action) {
      case "toggle":
        let script = "document.getElementById('value').innerText = \""+message+"\"";
        webView.current?.injectJavaScript(script);
        break;
      case "dismiss":
        setModalVisible(false)
        break;
      default: break;
    }
  }

  function doAddition() {
    let script = `
      window.ReactNativeWebView.postMessage(JSON.stringify({
        "action": "addition",
        "message": addition(2,3)
      }));
    `;
    webView.current?.injectJavaScript(script);
  }

  const html = require('./resources/index.html');

  const jsCode = `
            var _selector = document.querySelector('input[name=myCheckbox]');
            _selector.addEventListener('change', function(event) {
                var message = (_selector.checked) ? "Toggle Switch is on" : "Toggle Switch is off";
                let responseData = {
                            "message": message,
                            "action": "toggle"
                        };
                window.ReactNativeWebView.postMessage(JSON.stringify(responseData));
            });
        `;

  return(
    <View style={styles.centeredView}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
          <Button title='Addition' onPress={doAddition}/>
          <WebView
            ref={webView}
            style={styles.modalView}
            scalesPageToFit={false}
            mixedContentMode="compatibility"
            onMessage={onMessage}
            originWhitelist={['*']}
            useWebkit={true}
            source={html}
            javaScriptEnabled={true}
            injectedJavaScript={jsCode} 
            />
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      </View>
  );

  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     {/* <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={backgroundStyle}>
  //       <Header />
  //       <View
  //         style={{
  //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //         }}>
  //         <Section title="Step One">
  //           Edit <Text style={styles.highlight}>App.tsx</Text> to change this
  //           screen and then come back to see your edits.
  //         </Section>
  //         <Section title="See Your Changes">
  //           <ReloadInstructions />
  //         </Section>
  //         <Section title="Debug">
  //           <DebugInstructions />
  //         </Section>
  //         <Section title="Learn More">
  //           Read the docs to discover what to do next:
  //         </Section>
  //         <LearnMoreLinks />
  //       </View>
  //     </ScrollView> */}
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;

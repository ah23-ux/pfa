import {Tabs} from "expo-router"
import  {Ionicons} from '@expo/vector-icons'
const DashboardLayout = ()=> {
    return (
        <Tabs screenOptions={{ headerShown:false, tabBarStyle:{
            backgroundColor:  '#f5f5dc',
            paddingTop:10,
            height:90,},
            tabBarActiveTintColor: '#333',
            tabBarInactiveTintColor:'#333',
        }}>
           <Tabs.Screen name="index"  options={{title:'Home', tabBarIcon:({focused})=>(
            <Ionicons
            size={24}
            name={focused ? 'home': 'home-outline'} 
            color={focused ? '#05822e': '#011909'}/>
           )}}/>
           <Tabs.Screen name="profil"  options={{title:'Profile', tabBarIcon:({focused}) => (
            <Ionicons
            size={24}
            name={focused ? 'person': 'person-outline'} 
            color={focused ? '#05822e': '#011909'}/>
           )}}/>
           <Tabs.Screen name="Historique"  options={{title:'Historique', tabBarIcon:({focused})=>(
            <Ionicons
            size={24}
            name={focused ? 'time': 'time-outline'} 
            color={focused ? '#05822e': '#011909'}/>

           )}}/>
        </Tabs>
    )
}
export default DashboardLayout  
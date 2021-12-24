import React from "react"
import { useColorScheme, View } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"
import { MainScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import { useStores } from "../models"
import { GradientBackground, Icon, Text } from "../components"
import { Swipeable } from "../components/swipeable/swipeable"
import { ACTION, ACTION_CONTAINER, ACTION_LABEL, DRAWER, DRAWER_MENU_ITEM, ICON, LABEL } from "./styles"

export type NavigatorParamList = {
  [key: string]: undefined
}

const Drawer = createDrawerNavigator<NavigatorParamList>()

const CustomDrawerContent = (props) => {
  console.log('REDRAWWW')
  const {
    gamesStore: { games, updateLastViewed, createGame, deleteGame },
  } = useStores()
  return <DrawerContentScrollView {...props} contentContainerStyle={DRAWER}>
    <GradientBackground set={'purple'} />
    <Swipeable
        data={games}
        deleteAction={(id) => {
          deleteGame(id)
        }}
        renderChildren={(game) =>
          <DrawerItem
            key={game.id}
            label={game.name}
            onPress={() => {
              updateLastViewed(game.id)        
              props.navigation.closeDrawer()
            }}
            style={DRAWER_MENU_ITEM}
            labelStyle={LABEL} 
            />}
      />
      <DrawerItem
        label={() => <View style={ACTION_CONTAINER}><Icon icon="add" style={ICON} /><Text textKey={'add_game'} style={ACTION_LABEL} /></View>}
        onPress={() => {
          createGame('New Game')
          props.navigation.closeDrawer()
        }}
        style={ACTION} />
  </DrawerContentScrollView>
}
const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'main'}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
    <Drawer.Screen name={'main'} component={MainScreen} />
    </Drawer.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["main"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)

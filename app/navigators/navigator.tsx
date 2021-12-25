import React from "react"
import { useColorScheme, View } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import {
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer"
import { MainScreen } from "../screens"
import { GradientBackground, Icon, Text } from "../components"
import { Swipeable } from "../components/swipeable/swipeable"
import { ACTION, ACTION_CONTAINER, ACTION_LABEL, DRAWER, DRAWER_MENU_ITEM, LABEL } from "./styles"
import { translate } from "../i18n"
import { navigationRef } from "../utils/navigation"
import { useStore } from "../store"

export type NavigatorParamList = {
  [key: string]: undefined
}

const Drawer = createDrawerNavigator<NavigatorParamList>()

const CustomDrawerContent = (props) => {
  const {
    gamesStore: { games, updateLastViewed, createGame, deleteGame, reorderGames },
  } = useStore()
  return <View {...props} style={DRAWER}>
    <GradientBackground set={'purple'} />
    <Swipeable
        data={games.slice()}
        deleteAction={(id) => {
          deleteGame(id)
        }}
        reorder={(data) => reorderGames(data)}
        renderChildren={(game) =>
          <DrawerItem
            key={game.id}
            label={game.name || translate('empty')}
            onPress={() => {
              updateLastViewed(game.id)        
              props.navigation.closeDrawer()
            }}
            style={DRAWER_MENU_ITEM}
            labelStyle={LABEL} 
            />}
      />
      <DrawerItem
        label={() => <View style={ACTION_CONTAINER}>
          <Text textKey={'add_game'} style={ACTION_LABEL} />
          <Icon icon="add" preset={'mid'} />
        </View>}
        onPress={() => {
          createGame()
          props.navigation.closeDrawer()
        }}
        style={ACTION} />
  </View>
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
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
        //  swipeEdgeWidth: 1000,
        //  drawerPosition: "right"
        }}
        initialRouteName={'main'}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
      <Drawer.Screen name={'main'} component={MainScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["main"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)

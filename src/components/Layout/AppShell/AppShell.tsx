import { AppShell as MantineAppShell, ScrollArea, Text } from "@mantine/core";
import { FC } from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../../features/ScrollToTop/ScrollToTop";
import Main from "../Main/Main";
import Header from "../Header/Header";
import classes from "./AppShell.module.css"

const AppShell: FC = () => {
  return (
    <MantineAppShell
      layout="alt"
      footer={{ height: 60 }}
    >
      <MantineAppShell.Main>
        <MantineAppShell.Section>
          <Header />
        </MantineAppShell.Section>
        <MantineAppShell.Section component={ScrollArea} className={classes.main} grow>
          <Main />
        </MantineAppShell.Section>
        <ScrollToTop />
      </MantineAppShell.Main>
      <MantineAppShell.Footer withBorder={false}>
        <Footer />
      </MantineAppShell.Footer>
    </MantineAppShell >
  )
}

export default AppShell;
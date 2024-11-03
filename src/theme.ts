import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  globalCss: {
    body: {
      background: "red"
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)

import * as fs from 'fs'

import { replaceAll } from '../utils'
import { getVarsInPath } from './utils/server'

// I N T E R F A C E S
export interface RouteParams {
  filePath: string
  entryFolderPath: string
}
export interface Route {
  route: string
  normalizedRoute: string
  vars: string[]
  filename: string
  fileContent: string
  stateVars: string[]
  statusCode: number
  getFileContent: (vars: string[]) => string
}

export const getRouteFromFilePath = (filePath: string): string => {
  // TODO
  return filePath
}

export const getNormalizedRoute = (route: string, vars: string[] = []): string => {
  vars.forEach(variable => {
    route = replaceAll(route, `[${variable}]`, `:${variable}`)
  })

  return route
}

export const getStateVarsInFilename = (filename: string): string[] => {
  let stateVars: string[] = []
  const explodedFilename = filename.split('.')

  explodedFilename.forEach(filenameElement => {
    const isStateVar = filenameElement.startsWith('{') && filenameElement.endsWith('}')

    if (isStateVar) {
      stateVars = [...filenameElement.slice(1, -1).split('|')]
    }
  })

  return stateVars
}

export const getContentWithReplacedVars = (
  content: string,
  vars: {[key: string]: string}
): string => {
  Object.keys(vars).forEach((variable) => {
    // TODO: Check that variable isn't unscaped with '\'
    content = replaceAll(
      content,
      `[${variable}]`,
      vars[variable]
    )
  })

  return content
}

export const getRoute = ({
  filePath,
  entryFolderPath
}: RouteParams): Route => {
  // relative to the entry folder
  const relativeFilePath = filePath.replace(entryFolderPath, '')
  const [filename] = relativeFilePath.split('/').slice(-1)
  const route = getRouteFromFilePath(relativeFilePath)
  const vars = getVarsInPath(route)
  const normalizedRoute = getNormalizedRoute(route, vars)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const stateVars = getStateVarsInFilename(filename)

  const getFileContent = (varsToReplace: string[]): string => {
    // TODO:
    console.log(varsToReplace)
    return ''
  }

  return {
    route,
    vars,
    normalizedRoute,
    filename,
    fileContent,
    getFileContent,
    stateVars,
    statusCode: 200
  }
}

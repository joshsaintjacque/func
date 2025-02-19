import { CommandClass, OptionClass, OptionParams } from '../interfaces'
import { metadata } from '../constants/metadata'

export type OptionKeyValue = { [key: string]: string }

export const commandsToDatas = (commands: CommandClass[] = []) => {
  return commands.map(fn => Reflect.getMetadata(metadata.COMMAND_IDENTIFIER, fn))
}

export const optionsToDatas = (options: OptionClass[]) => {
  return options.map(fn => Reflect.getMetadata(metadata.OPTION_IDENTIFIER, fn))
}

export const optionsToKeyValue = (params: OptionParams[] = []): OptionKeyValue => {
  if (!params || !params.length) return {}
  return params.reduce((pre, current) => {
    const name = `--${current.name}`
    const alias = current.alias ? { [`-${current.alias}`]: name } : {}
    return Object.assign({}, pre, {
      [name]: current.type,
    }, alias)
  }, {})
}

export const removeHyphen = (key: string): string => {
  return key.replace(/^[-]+/, '')
}

export const ensureHyphen = (key: string, len = 2): string => {
  const hyphens = '-'.repeat(len)
  return hyphens + removeHyphen(key)
}

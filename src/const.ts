import { HttpVerb, CastingOperator } from './types'

export const CURRENT_LOCATION_ROUTE_SELECTOR = '_'
export const HTTP_VERBS: HttpVerb[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
export const INTERNAL_BASEURL = '/restapify'
export const INTERNAL_API_BASEURL = `${INTERNAL_BASEURL}/api`
export const DASHBOARD_FOLDER_PATH = './dashboard-public/'
export const OPEN_DASHBOARD_TIMEOUT = 1000

export const CASTING_OPERATORS: CastingOperator[] = ['number', 'boolean']
export const NUMBER_CAST_INDICATOR = 'n:'
export const BOOLEAN_CAST_INDICATOR = 'b:'

export const EMPTY_BODY_SYNTAX = [null]
export const HEADER_SYNTAX = '#header'
export const BODY_SYNTAX = '#body'

export const QUERY_STRING_VAR_MATCHER = /\[q:(.*?)\]/g
export const QS_VAR_DEFAULT_SEPARATOR = '|'

// faker's syntax looks like `[#faker:<...>]`
// ex: [#faker:lorem:sentence], [#faker:image:avatar]
export const FAKER_SYNTAX_PREFIX = '[#faker:'
export const FAKER_SYNTAX_SUFIX = ']'
export const FAKER_SYNTAX_MATCHER = /\[#faker:(.*?)\]/g

// eslint-disable-next-line max-len
export const FOR_LOOP_SYNTAX_MATCHER = /"#for ((?:(?!"#for .*? in .*?",|"#endfor").)*?) in ((?:(?!"#for .*? in .*?",|"#endfor").)*?)",((?:(?!#for .*? in .*?",|"#endfor").)*?),"#endfor"/g
export const FOR_LOOP_SYNTAX_PREFIX = '#for'
export const FOR_LOOP_SYNTAX_SUFFIX = '#endfor'

import React from 'react'
import { createDevTools } from 'redux-devtools'

import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
  <DockMonitor toggleVisibility="ctrl-h"
               changePositionKey="ctrl-q"
               defaultIsVisible={true}>
    <LogMonitor />
  </DockMonitor>
)

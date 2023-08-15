import { CustomTooltip } from '@remix-ui/helper'
import React, { useState, useEffect } from 'react' // eslint-disable-line
import './button-navigator.css'

export const ButtonNavigation = ({ stepOverBack, stepIntoBack, stepIntoForward, stepOverForward, jumpOut, jumpPreviousBreakpoint, jumpNextBreakpoint, jumpToException, revertedReason, stepState, jumpOutDisabled }) => {
  const [state, setState] = useState({
    intoBackDisabled: true,
    overBackDisabled: true,
    intoForwardDisabled: true,
    overForwardDisabled: true,
    jumpOutDisabled: true,
    jumpNextBreakpointDisabled: true,
    jumpPreviousBreakpointDisabled: true
  })

  useEffect(() => {
    stepChanged(stepState, jumpOutDisabled)
  }, [stepState, jumpOutDisabled])

  const reset = () => {
    setState(() => {
      return {
        intoBackDisabled: true,
        overBackDisabled: true,
        intoForwardDisabled: true,
        overForwardDisabled: true,
        jumpOutDisabled: true,
        jumpNextBreakpointDisabled: true,
        jumpPreviousBreakpointDisabled: true
      }
    })
  }

  const stepChanged = (stepState, jumpOutDisabled) => {
    if (stepState === 'invalid') {
      // TODO: probably not necessary, already implicit done in the next steps
      reset()
      return
    }

    setState(() => {
      return {
        intoBackDisabled: stepState === 'initial',
        overBackDisabled: stepState === 'initial',
        jumpPreviousBreakpointDisabled: stepState === 'initial',
        intoForwardDisabled: stepState === 'end',
        overForwardDisabled: stepState === 'end',
        jumpNextBreakpointDisabled: stepState === 'end',
        jumpOutDisabled: (jumpOutDisabled !== null) && (jumpOutDisabled !== undefined) ? jumpOutDisabled : true
      }
    })
  }

  const stepBtnStyle = 'd-flex align-items-center justify-content-center btn btn-primary btn-sm stepButton h-75 m-0 p-1'
  const disableStepBtnStyle = 'stepButtonDisabled'
  const disableJumpBtnStyle = 'jumpButtonDisabled'
  const stepMarkupStructure = {
    stepOverBackJSX : {
      markup: (<div className={state.overBackDisabled ? `${stepBtnStyle} ${disableStepBtnStyle}`: `${stepBtnStyle}`} onClick={() => { stepOverBack && stepOverBack() }}>
        <button id='overback' className='btn btn-link btn-sm stepButton m-0 p-0' onClick={() => { stepOverBack && stepOverBack() }} disabled={state.overBackDisabled} style={{ pointerEvents: 'none', color: 'white' }}>
          <span className="fas fa-reply"></span>
        </button>
      </div>),
      placement: 'top-start',
      tagId: 'overbackTooltip',
      tooltipMsg: 'Step over back'
  },
    stepBackJSX : {
      markup: (
      <div className={state.intoBackDisabled ? `${stepBtnStyle} ${disableStepBtnStyle}`: `${stepBtnStyle}`} onClick={() => { stepIntoBack && stepIntoBack() }} data-id="buttonNavigatorIntoBack" id="buttonNavigatorIntoBackContainer">
        <button id='intoback' data-id="buttonNavigatorIntoBack" className='btn btn-link btn-sm stepButton m-0 p-0' onClick={() => { stepIntoBack && stepIntoBack() }} disabled={state.intoBackDisabled} style={{ pointerEvents: 'none', color: 'white' }}>
            <span className="fas fa-level-up-alt"></span>
        </button>
      </div>
    ),
    placement: 'top-start',
    tagId: 'intobackTooltip',
    tooltipMsg: 'Step back'
  },
    
    stepIntoJSX : {
      markup: (
      <div className={state.intoForwardDisabled ? `${stepBtnStyle} ${disableStepBtnStyle}`: `${stepBtnStyle}`} onClick={() => { stepIntoForward && stepIntoForward() }} data-id="buttonNavigatorIntoForward" id="buttonNavigatorIntoFowardContainer">
        <button id='intoforward' data-id="buttonNavigatorIntoForward" className='btn btn-link btn-sm stepButton m-0 p-0' onClick={() => { stepIntoForward && stepIntoForward() }} disabled={state.intoForwardDisabled}
        style={{ pointerEvents: 'none', color: 'white' }}
        >
            <span className="fas fa-level-down-alt"></span>
        </button>
      </div>
    ),
    placement: 'top-start',
    tagId: 'intoforwardTooltip',
    tooltipMsg: 'Step into'
  },
    stepOverForwardJSX : { 
      markup: (
      <div className={state.overForwardDisabled ? `${stepBtnStyle} ${disableStepBtnStyle}`: `${stepBtnStyle}`} onClick={() => { stepOverForward && stepOverForward() }} data-id="buttonNavigatorOverForward" id="buttonNavigatorOverForwardContainer">
        <button id='overforward' className='btn btn-link btn-sm stepButton m-0 p-0' onClick={() => { stepOverForward && stepOverForward() }} disabled={state.overForwardDisabled} style={{ pointerEvents: 'none', color: 'white' }}>
            <span className="fas fa-share"></span>
        </button>
      </div>
    ),
    placement: 'top-end',
    tagId: 'overbackTooltip',
    tooltipMsg: 'Step over forward',
  }
}
  const jumpMarkupStructure = {
    jumpPreviousBreakpointJSX : {
      markup: (
      <div className={state.jumpPreviousBreakpointDisabled ? `${stepBtnStyle} ${disableJumpBtnStyle}`: `${stepBtnStyle}`} id="buttonNavigatorJumpPreviousBreakpointContainer" onClick={() => { jumpPreviousBreakpoint && jumpPreviousBreakpoint() }} data-id="buttonNavigatorJumpPreviousBreakpoint">
                <button className='btn btn-link btn-sm jumpButton m-0 p-0' id='jumppreviousbreakpoint' data-id="buttonNavigatorJumpPreviousBreakpoint" onClick={() => { jumpPreviousBreakpoint && jumpPreviousBreakpoint() }} disabled={state.jumpPreviousBreakpointDisabled} style={{ pointerEvents: 'none', backgroundColor: 'inherit', color: 'white' }}>
                    <span className="fas fa-step-backward"></span>
                </button>
              </div>
    ),
    placement: 'bottom-start',
    tagId: 'jumppreviousbreakpointTooltip',
    tooltipMsg: 'Jump to the previous breakpoint'
  },
    jumpOutJSX : {
      markup: (
      <div className={state.jumpOutDisabled ? `${stepBtnStyle} ${disableStepBtnStyle}`: `${stepBtnStyle}`} onClick={() => { jumpOut && jumpOut() }} data-id="buttonNavigatorJumpOut" id="buttonNavigatorJumpOutContainer">
                <button className='btn btn-link btn-sm jumpButton m-0 p-0' id='jumpout' onClick={() => { jumpOut && jumpOut() }} disabled={state.jumpOutDisabled} style={{ pointerEvents: 'none', backgroundColor: 'inherit', color: 'white' }} data-id="buttonNavigatorJumpOut">
                    <span className="fas fa-eject"></span>
                </button>
              </div>
    ),
    placement: 'bottom-end',
    tagId: 'jumpoutTooltip',
    tooltipMsg: 'Jump out'
    },
    jumpNextBreakpointJSX : {
      markup: (
      <div className={state.jumpNextBreakpointDisabled ? `${stepBtnStyle} ${disableStepBtnStyle}`: `${stepBtnStyle}`} onClick={() => { jumpNextBreakpoint && jumpNextBreakpoint() }} data-id="buttonNavigatorJumpNextBreakpoint" id="buttonNavigatorJumpNextBreakpointContainer">
                <button className='btn btn-link btn-sm jumpButton m-0 p-0' id='jumpnextbreakpoint' data-id="buttonNavigatorJumpNextBreakpoint" onClick={() => { jumpNextBreakpoint && jumpNextBreakpoint() }} disabled={state.jumpNextBreakpointDisabled} style={{ pointerEvents: 'none', color: 'white' }}>
                    <span className="fas fa-step-forward"></span>
                </button>
              </div>
    ),
    placement: 'bottom-end',
      tagId: 'jumpnextbreakpointTooltip',
      tooltipMsg: 'Jump to the next breakpoint'
    }
  }

  return (
    <div className="buttons">
      <div className="stepButtons btn-group py-1">
        {
          Object.keys(stepMarkupStructure).map(x => (
            <CustomTooltip
              placement={stepMarkupStructure[x].placement}
              tooltipId={stepMarkupStructure[x].tagId}
              tooltipText={stepMarkupStructure[x].tooltipMsg}
              key={`${stepMarkupStructure[x].placement}-${stepMarkupStructure[x].tooltipMsg}-${stepMarkupStructure[x].tagId}`}
            >
              {stepMarkupStructure[x].markup}
            </CustomTooltip>
          ))
        }
      </div>

      <div className="jumpButtons btn-group py-1">
          {
            Object.keys(jumpMarkupStructure).map(x => (
              <CustomTooltip
                placement={jumpMarkupStructure[x].placement}
                tooltipText={jumpMarkupStructure[x].tooltipMsg}
                tooltipId={jumpMarkupStructure[x].tooltipId}
                key={`${jumpMarkupStructure[x].placement}-${jumpMarkupStructure[x].tooltipMsg}-${jumpMarkupStructure[x].tagId}`}
              >
                {jumpMarkupStructure[x].markup}
            </CustomTooltip>
            ))
          }
      </div>
      <div id='reverted' style={{ display: revertedReason === '' ? 'none' : 'block' }}>
        <span className='text-warning'>This call has reverted, state changes made during the call will be reverted.</span>
        <span className='text-warning' id='outofgas' style={{ display: revertedReason === 'outofgas' ? 'inline' : 'none' }}>This call will run out of gas.</span>
        <span className='text-warning' id='parenthasthrown' style={{ display: revertedReason === 'parenthasthrown' ? 'inline' : 'none' }}>The parent call will throw an exception</span>
        <div className='text-warning'>Click <u data-id="debugGoToRevert" className="cursorPointerRemixDebugger" role="button" onClick={() => { jumpToException && jumpToException() }}>here</u> to jump where the call reverted.</div>
      </div>
    </div>
  )
}

export default ButtonNavigation

import { HapPresetComponentNode } from '@vdian/hap-preset-component-node'
import { declarePreset, declareProject } from '@vdian/hap-next'

export default declareProject(() => {
    return {
        name: 'midlog',
        presets: [declarePreset(HapPresetComponentNode)]
    }
})

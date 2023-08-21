import { atom, useAtom } from 'jotai'
import { z } from 'zod'

export const zoomAtom = atom(1)

zoomAtom.debugLabel = 'zoomAtom'

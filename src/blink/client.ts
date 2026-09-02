import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'migrarcon-sentido-premium-y5qdrpur',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_PfBGl1xCJfiZdXgvqpIwBUVdfZp0KTbu',
  authRequired: false,
  auth: { mode: 'managed' },
})

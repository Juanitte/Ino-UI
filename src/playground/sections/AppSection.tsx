import { useState } from 'react'
import { App, Button, Text, Toggle } from '../../index'
import type { PopAlertPlacement } from '../../index'
import { Section } from './shared'

// ─── 1. Basic Usage ───────────────────────────────────────────────────────────

function BasicContent() {
  const { modal, notification } = App.useApp()

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button
        variant="primary"
        onClick={() => notification.success('Saved successfully!')}
      >
        Show notification
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          modal.confirm({
            title: 'Delete item?',
            content: 'This action cannot be undone.',
            onOk: () =>
              new Promise((resolve) => setTimeout(resolve, 1000)),
          })
        }
      >
        Open confirm
      </Button>
    </div>
  )
}

function BasicDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text type="secondary" size="sm">
        Both buttons use <code>useApp()</code> — no local hook setup needed.
      </Text>
      <App>
        <BasicContent />
      </App>
    </div>
  )
}

// ─── 2. Notifications ─────────────────────────────────────────────────────────

const NOTIF_PLACEMENTS: PopAlertPlacement[] = [
  'top', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'bottom',
]

function NotificationsContent({ placement }: { placement: PopAlertPlacement }) {
  const { notification } = App.useApp()

  const items: { label: string; action: () => void }[] = [
    { label: 'Success', action: () => notification.success('Operation completed!') },
    { label: 'Error', action: () => notification.error('Something went wrong.') },
    { label: 'Info', action: () => notification.info('Here is some information.') },
    { label: 'Warning', action: () => notification.warning('Please review this.') },
    { label: 'Loading', action: () => notification.loading('Processing...', 2) },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text type="secondary" size="sm">Placement: <strong>{placement}</strong></Text>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {items.map(({ label, action }) => (
          <Button key={label} variant="outline" size="sm" onClick={action}>{label}</Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            notification.open({
              type: 'info',
              content: 'Custom notification',
              description: 'With a description and no auto-close.',
              duration: 0,
              closable: true,
              showProgress: false,
            })
          }
        >
          Custom
        </Button>
      </div>
    </div>
  )
}

function NotificationsDemo() {
  const [placement, setPlacement] = useState<PopAlertPlacement>('top')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toggle
        options={NOTIF_PLACEMENTS}
        value={placement}
        onChange={(v) => setPlacement(v as PopAlertPlacement)}
        size="small"
        style={{ alignSelf: 'flex-start' }}
      />
      <App notification={{ placement }}>
        <NotificationsContent placement={placement} />
      </App>
    </div>
  )
}

// ─── 3. Modal Confirmations ───────────────────────────────────────────────────

function ModalsContent() {
  const { modal } = App.useApp()

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          modal.confirm({
            title: 'Confirm action',
            content: 'Are you sure you want to proceed? This action is irreversible.',
            onOk: () => new Promise((resolve) => setTimeout(resolve, 1200)),
          })
        }
      >
        Confirm
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          modal.info({ title: 'Information', content: 'Here is some important information for you.' })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          modal.success({ title: 'Done!', content: 'Your changes have been saved successfully.' })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          modal.warning({ title: 'Warning', content: 'This may have unintended side effects.' })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          modal.error({ title: 'Error', content: 'An unexpected error occurred. Please try again.' })
        }
      >
        Error
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const instance = modal.confirm({
            title: 'Long operation',
            content: 'This will update in 2s and close in 4s.',
          })
          setTimeout(() => instance.update({ title: 'Almost done...', content: 'Wrapping up.' }), 2000)
          setTimeout(() => instance.destroy(), 4000)
        }}
      >
        Update & destroy
      </Button>
    </div>
  )
}

function ModalsDemo() {
  return (
    <App>
      <ModalsContent />
    </App>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function AppSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block', marginBottom: 24 }}>App</Text>

      <Section title="Basic Usage" align="start">
        <BasicDemo />
      </Section>

      <Section title="Notifications" align="start">
        <NotificationsDemo />
      </Section>

      <Section title="Modal Confirmations" align="start">
        <ModalsDemo />
      </Section>
    </div>
  )
}

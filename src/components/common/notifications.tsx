
import { Badge, Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { FaBell } from 'react-icons/fa'

export default function Notifications() {
  const notifications = [
    { id: 1, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 2, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 3, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 4, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 5, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 6, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 7, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 8, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 9, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 10, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 11, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 12, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 13, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 14, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 15, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 16, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 17, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 18, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 19, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 20, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 21, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 22, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 23, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 24, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 25, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 26, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 27, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
    { id: 28, title: "New message", description: "You have a new message from John Doe", time: "5 min ago" },
    { id: 29, title: "Meeting reminder", description: "Team standup in 15 minutes", time: "10 min ago" },
    { id: 30, title: "Task completed", description: "Project X has been marked as complete", time: "1 hour ago" },
  ]
  return (
    <Popover radius='sm' offset={10} showArrow shadow="sm">
      <PopoverTrigger>
        <button className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium focus-visible:outline-none">
          <Badge content="99+" isInvisible={false} shape="circle" color="danger">
            <FaBell size={24} />
          </Badge>
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-96 p-0'>
        <div className="w-full">
          <div className="flex justify-between p-3 font-bold border-b">
            <h2 className="text-lg">Notifications</h2>
            <div className='flex flex-col justify-end gap-2'>
              <Badge content="99+" isInvisible={false} shape="circle" color="danger">
                <Button variant="light" color="primary" size="sm" className="rounded-full px-4 py-2 text-sm font-medium">
                  Mark all as read
                </Button>
              </Badge>
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto p-0">
            <Listbox className="p-0" aria-labelledby='notifications-title'>
              {notifications.map((notification) => (
                <ListboxItem textValue={notification.title} key={notification.id} variant='flat' className='rounded-none px-4 py-2'>
                  <div className="flex justify-between gap-2 items-center">
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-500">{notification.description}</p>
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
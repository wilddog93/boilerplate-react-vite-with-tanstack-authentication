import { Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react'

type Props = {
  user?: {
    avatar: string;
    name: string;
    email: string;
  }
}

export default function UserMenus({ user }: Props) {
  return (
    <Popover showArrow shadow='sm' placement="bottom">
      <PopoverTrigger>
        <User
          as="button"
          className="transition-transform"
          name={user?.name || 'Jason Hughes'}
          description={user?.email || 'zoey@example.com'}
          avatarProps={{
            src: user?.avatar || 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
          }}
          aria-hidden="true"
        />
      </PopoverTrigger>
      <PopoverContent aria-label="Profile Actions">
        <Listbox className="p-0" aria-labelledby='profile-title'>
          <ListboxItem textValue="item1" key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email || 'zoey@example.com'}</p>
          </ListboxItem>
          <ListboxItem textValue="item2" key="team_settings">Team Settings</ListboxItem>
          <ListboxItem textValue="item3" key="analytics">Analytics</ListboxItem>
          <ListboxItem textValue="item4" key="system">System</ListboxItem>
          <ListboxItem textValue="item5" key="configurations">Configurations</ListboxItem>
          <ListboxItem textValue="item6" key="help_and_feedback">Help & Feedback</ListboxItem>
          <ListboxItem textValue="item7" key="logout" color="danger">
            Log Out
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}
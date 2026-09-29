import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/Components/ui/sidebar";
import {
  ChevronRight,
  LogOut,
  LayoutDashboard,
  UsersRound,
  HeartHandshake,
  ClipboardList,
  Droplets,
  HandHelping,
  BarChart3,
  Settings,
  // BarChart3,
  // Bell,
  // Settings,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const navMain = [
  { title: "Dashboard", url: "dashboard", link: "dashboard", icon: LayoutDashboard },
  { title: "User Management", url: "user-management", link: "users", icon: UsersRound },
  { title: "Donor Management", url: "donor-management", link: "donors", icon: HeartHandshake },
  { title: "Donation Records", url: "donation-records", link: "donations", icon: ClipboardList },
  { title: "Blood Inventory", url: "admin.inventory", link: "inventory", icon: Droplets },
  { title: "Blood Requests", url: "admin.requests", link: "requests", icon: HandHelping },
  { title: "Analytics & Reports", url: "admin.analytics", link: "analytics", icon: BarChart3 },
  //{ title: "Notifications", url: "admin.notifications", link: "notifications", icon: Bell },
  { title: "Settings", url: "admin.settings", link: "settings", icon: Settings },
];

function AppSidebar({ title }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { props } = usePage();

  const user = props?.auth?.user;
  const name = user?.name || "Dr. Maria Santos";
  const role = user?.role || "MCCEI Admin";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar collapsible="icon" className="border-r border-white/10">
      {/* Header */}
      <SidebarHeader className="p-4 pb-0">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-base font-bold text-white shadow-lg">
            MC
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-lg font-bold text-white">MCCEI</p>
              <p className="text-sm text-sky-300">Blood Donor System</p>
            </div>
          )}
        </div>

        {/* {!collapsed && (
          <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500/30 px-3 py-1 text-xs font-semibold text-white">
            <span className="size-1.5 rounded-full bg-sky-300" />
            {role}
          </div>
        )} */}

        <div className="mt-1 mb-3 border-b border-white/10" />
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="px-3 py-3 group-data-[collapsible=icon]:px-2">
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-1">
            {navMain.map((item) => {
              const active = title === item.title;
              const exists = route().has(item.url);
              const Comp = exists ? Link : "a";

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      "h-11 rounded-xl px-3 text-[15px] font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white [&>svg]:size-5",
                      active && "bg-blue-600 text-white shadow-md hover:bg-blue-600 hover:text-white"
                    )}
                  >
                    <Comp href={exists ? route(item.url) : "#"}>
                      <item.icon
                        strokeWidth={1.75}
                        className={cn(
                          "transition-colors",
                          !active && "text-slate-400 group-hover/menu-item:text-white"
                        )}
                      />
                      <span>{item.title}</span>
                      {active && <ChevronRight className="ml-auto size-4 opacity-70" />}
                    </Comp>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="gap-3 border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold text-white">{name}</p>
              <p className="truncate text-sm text-sky-300">{role}</p>
            </div>
          )}
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="h-10 rounded-xl font-semibold text-rose-300 hover:bg-white/5 hover:text-rose-200"
            >
              <Link href={route("logout")} method="post" as="button">
                <LogOut className="size-5" strokeWidth={1.75} />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
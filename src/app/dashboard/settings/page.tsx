"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User, Bell, Shield, CreditCard, Key, Globe,
  Trash2, Save, Check, AlertTriangle,
} from "lucide-react"

// Dynamic import for Switch not needed - it's a client component already
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences, security settings, and billing."
      >
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Save className="size-3.5" />
          Save changes
        </Button>
      </PageHeader>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="h-9 p-1">
          <TabsTrigger value="profile" className="gap-1.5 text-xs">
            <User className="size-3.5" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 text-xs">
            <Bell className="size-3.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 text-xs">
            <Shield className="size-3.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5 text-xs">
            <CreditCard className="size-3.5" /> Billing
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-1.5 text-xs">
            <Key className="size-3.5" /> API Keys
          </TabsTrigger>
        </TabsList>

        {/* ── Profile ── */}
        <TabsContent value="profile" className="space-y-5 animate-fade-in-up">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-sm">Personal Information</CardTitle>
              <CardDescription className="text-xs">Update your name, email, and profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-primary/20 text-primary text-lg font-semibold">JM</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="text-xs h-7">Change photo</Button>
                  <p className="text-[11px] text-muted-foreground mt-1">JPG, GIF or PNG. Max 2MB.</p>
                </div>
              </div>

              <Separator className="opacity-40" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "first", label: "First name", placeholder: "Jordan", defaultValue: "Jordan" },
                  { id: "last", label: "Last name", placeholder: "Mitchell", defaultValue: "Mitchell" },
                ].map((f) => (
                  <div key={f.id} className="space-y-1.5">
                    <Label htmlFor={f.id} className="text-xs font-medium">{f.label}</Label>
                    <Input id={f.id} defaultValue={f.defaultValue} className="h-8 text-sm" />
                  </div>
                ))}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="email" className="text-xs font-medium">Email address</Label>
                  <Input id="email" type="email" defaultValue="jordan@acme.io" className="h-8 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-xs font-medium">Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="timezone" className="text-xs font-medium">Timezone</Label>
                  <Select defaultValue="america-la">
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-la">America/Los_Angeles</SelectItem>
                      <SelectItem value="america-ny">America/New_York</SelectItem>
                      <SelectItem value="europe-london">Europe/London</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="sm" className="h-8 gap-1.5 text-xs">
                  <Save className="size-3.5" />
                  Save profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Notifications ── */}
        <TabsContent value="notifications" className="space-y-5 animate-fade-in-up">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-sm">Email Notifications</CardTitle>
              <CardDescription className="text-xs">Choose which events trigger email alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New user signup", desc: "When a new user joins the platform", defaultChecked: true },
                { label: "New purchase", desc: "When a payment is successfully processed", defaultChecked: true },
                { label: "Failed payment", desc: "When a payment attempt fails", defaultChecked: true },
                { label: "Security alerts", desc: "Suspicious login attempts or anomalies", defaultChecked: true },
                { label: "Weekly digest", desc: "Summary of key metrics every Monday", defaultChecked: false },
                { label: "Product updates", desc: "Changelog and new feature announcements", defaultChecked: false },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-[11px] text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Security ── */}
        <TabsContent value="security" className="space-y-5 animate-fade-in-up">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-sm">Password</CardTitle>
              <CardDescription className="text-xs">Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "current", label: "Current password" },
                { id: "new", label: "New password" },
                { id: "confirm", label: "Confirm new password" },
              ].map((f) => (
                <div key={f.id} className="space-y-1.5">
                  <Label htmlFor={f.id} className="text-xs font-medium">{f.label}</Label>
                  <Input id={f.id} type="password" className="h-8 text-sm" />
                </div>
              ))}
              <Button size="sm" className="h-8 gap-1.5 text-xs">
                <Shield className="size-3.5" /> Update password
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-xs">Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Authenticator app</p>
                  <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 bg-emerald-500/10">
                    <Check className="size-2.5 mr-1" /> Enabled
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">TOTP via Google Authenticator</p>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">Manage</Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-sm text-destructive flex items-center gap-2">
                <AlertTriangle className="size-4" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="text-[11px] text-muted-foreground">This action cannot be undone.</p>
              </div>
              <Button variant="destructive" size="sm" className="h-7 text-xs gap-1.5">
                <Trash2 className="size-3.5" /> Delete
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Billing ── */}
        <TabsContent value="billing" className="space-y-5 animate-fade-in-up">
          <Card className="border-border/60">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm">Current Plan</CardTitle>
                  <CardDescription className="text-xs">You are on the Enterprise plan.</CardDescription>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Enterprise</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Monthly cost", value: "$599/mo" },
                  { label: "Next billing", value: "Apr 1, 2026" },
                  { label: "Seats used", value: "18 / 50" },
                ].map((i) => (
                  <div key={i.label} className="space-y-1">
                    <p className="text-[11px] text-muted-foreground">{i.label}</p>
                    <p className="text-sm font-semibold font-mono">{i.value}</p>
                  </div>
                ))}
              </div>
              <Separator className="opacity-40" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs h-7">Manage subscription</Button>
                <Button variant="ghost" size="sm" className="text-xs h-7">Download invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── API Keys ── */}
        <TabsContent value="api" className="space-y-5 animate-fade-in-up">
          <Card className="border-border/60">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm">API Keys</CardTitle>
                  <CardDescription className="text-xs">Manage your API keys for programmatic access.</CardDescription>
                </div>
                <Button size="sm" className="h-7 gap-1.5 text-xs">
                  <Key className="size-3.5" /> New key
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Production API Key", key: "vg_live_sk_...a4f2", created: "Jan 12, 2026", lastUsed: "2h ago", active: true },
                { name: "Staging API Key", key: "vg_test_sk_...b8d1", created: "Feb 3, 2026", lastUsed: "1d ago", active: true },
                { name: "CI/CD Deploy Key", key: "vg_live_sk_...c3e9", created: "Dec 28, 2025", lastUsed: "3d ago", active: false },
              ].map((k) => (
                <div key={k.key} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{k.name}</span>
                      <Badge variant="outline" className={cn("text-[9px] h-4 px-1", k.active ? "text-emerald-500 border-emerald-500/30" : "text-muted-foreground")}>
                        {k.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground">{k.key}</p>
                    <p className="text-[10px] text-muted-foreground/60">Created {k.created} · Last used {k.lastUsed}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button variant="ghost" size="icon" className="size-6 text-muted-foreground">
                      <Globe className="size-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-6 text-rose-500 hover:text-rose-500">
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Card, CardContent } from "@/components/ui/card"
import { Construction } from "lucide-react"

export const metadata = { title: "Activity" }

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity"
        description="This section is ready for your implementation."
      />
      <Card className="border-border/60">
        <CardContent>
          <EmptyState
            icon={Construction}
            title="Coming soon"
            description="The Activity section is placeholder. Fork this template and swap in your real data and logic."
          />
        </CardContent>
      </Card>
    </div>
  )
}

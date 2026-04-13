import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Card, CardContent } from "@/components/ui/card"
import { Construction } from "lucide-react"

export const metadata = { title: "Reports" }

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="This section is ready for your implementation."
      />
      <Card className="border-border/60">
        <CardContent>
          <EmptyState
            icon={Construction}
            title="Coming soon"
            description="The Reports section is placeholder. Fork this template and swap in your real data and logic."
          />
        </CardContent>
      </Card>
    </div>
  )
}

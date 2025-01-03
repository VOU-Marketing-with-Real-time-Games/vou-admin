import DocumentMeta from "react-document-meta";
import metadata from "../../utils/metadata";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StatCard, { StatCardProps } from "../../components/cards/StatCard.tsx";
import GamePieChart from "../../components/charts/GamePieChart.tsx";
import SessionsChart from "../../components/charts/SessionsChart.tsx";

const data: StatCardProps[] = [
  {
    title: "Users",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380, 360, 400, 380, 420, 400, 640, 340,
      460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "Campaigns",
    value: "103",
    interval: "Last 30 days",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820, 780, 800, 760, 380, 740, 660, 620,
      840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: "Brands",
    value: "18",
    interval: "Last 30 days",
    trend: "neutral",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520, 610, 530, 520,
      610, 530, 420, 510, 430, 520, 510,
    ],
  },
];
const HomePage = () => {
  return (
    <DocumentMeta {...metadata.homeMeta}>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        {/* cards */}
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          {data.map((card, index) => (
            <Grid key={index} size={4}>
              <StatCard {...card} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 6 }}>
            <GamePieChart />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SessionsChart />
            {/*<PageViewsBarChart />*/}
          </Grid>
        </Grid>
      </Box>
    </DocumentMeta>
  );
};

export default HomePage;

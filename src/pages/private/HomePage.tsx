import { useState, useEffect } from "react";
import DocumentMeta from "react-document-meta";
import metadata from "../../utils/metadata";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StatCard, { StatCardProps } from "../../components/cards/StatCard.tsx";
import SessionsChart from "../../components/charts/SessionsChart.tsx";
import userApi from "../../api/user.api";
import campaignApi from "../../api/campaign.api";
import brandApi from "../../api/brand.api.ts";

const data: StatCardProps[] = [
  {
    title: "Voucher",
    value: "16",
    interval: "Last 14 days",
    trend: "up",
    data: [0, 0, 1, 1, 1, 2, 3, 3, 2, 1, 1, 0, 1, 0],
  },
  {
    title: "Puzzle",
    value: "15",
    interval: "Last 14 days",
    trend: "down",
    data: [0, 0, 0, 0, 1, 2, 2, 0, 1, 3, 0, 2, 3, 1],
  },
  {
    title: "Game play",
    value: "35",
    interval: "Last 14 days",
    trend: "neutral",
    data: [0, 1, 2, 3, 5, 3, 5, 4, 3, 1, 1, 2, 2, 3],
  },
];
const HomePage = () => {
  const [userData, setUserData] = useState<StatCardProps | null>(null);
  const [campaignData, setCampaignData] = useState<StatCardProps | null>(null);
  const [brandData, setBrandData] = useState<StatCardProps | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      const results = await Promise.allSettled([
        userApi.getUserStatistics(),
        campaignApi.getCampaignStatistics(),
        brandApi.getBrandStatistics(),
      ]);

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          if (index === 0) setUserData(result.value);
          if (index === 1) setCampaignData(result.value);
          if (index === 2) setBrandData(result.value);
        } else {
          console.error(`Failed to fetch data for index ${index}`, result.reason);
        }
      });
    };

    fetchStatistics().then();
  }, []);

  return (
    <DocumentMeta {...metadata.homeMeta}>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          {userData && (
            <Grid size={4}>
              <StatCard {...userData} />
            </Grid>
          )}
          {campaignData && (
            <Grid size={4}>
              <StatCard {...campaignData} />
            </Grid>
          )}
          {brandData && (
            <Grid size={4}>
              <StatCard {...brandData} />
            </Grid>
          )}
          {data.map((card, index) => (
            <Grid key={index} size={{ lg: 4 }}>
              <StatCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </DocumentMeta>
  );
};

export default HomePage;

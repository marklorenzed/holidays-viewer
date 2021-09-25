import { Grid } from '@mui/material'
import React from 'react'
import Card from '../../components/Card'

export default function ErrorPAge() {
    return (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ padding: "20px" }}
        >
          <Grid
            item
            container
            style={{
              maxWidth: "1000px",
            }}
          >
            <Card>
              Error Loading Page
            </Card>
          </Grid>
        </Grid>
    )
}

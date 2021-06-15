import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./StatusStepper.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "En carrito",
    "Creada",
    "Procesando",
    "Completada",
    // "Entregada",
  ];
}

function getStep(status) {
  switch (status) {
    case "cart":
      return 1;
    case "created":
      return 2;
    case "processing":
      return 3;
    case "complete":
      return 4;
    case "cancelled":
      return 5;
    default:
      return "Unknown stepIndex";
  }
}

function getState(activeStep) {
  switch (activeStep) {
    case 1:
      return "cart";
    case 2:
      return "created";
    case 3:
      return "processing";
    case 4:
      return "complete";
    case 5:
      return "cancelled";
    default:
      return "Unknown stepIndex";
  }
}

export default function StatusStepper({ status, id, userId }) {
  // const classes = useStyles();
  const step = getStep(status);
  const [activeStep, setActiveStep] = React.useState(step);
  const steps = getSteps();

  const handleNext = async () => {
    if (activeStep <= 3) {
      await setActiveStep((old) => old + 1);
      let body = {
        status: getState(activeStep + 1),
        userId: userId,
      };
      axios({
        method: "PUT",
        url: `http://localhost:3001/orders/${id}`,
        data: body,
      });
    }
  };

  const handleCancel = () => {
    let body = {
      status: "cancelled",
      userId: userId,
    };
    axios({
      method: "PUT",
      url: `http://localhost:3001/orders/${id}`,
      data: body,
    });
  };

  return (
    <div>
      {activeStep !== 5 ? (
        <div className="stattusStepper">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography>
                  {/* className={classes.instructions} */}
                  Orden en manos del cliente!
                </Typography>
              </div>
            ) : (
              <div >
                <div className="statusButtons">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    SIGUIENTE
                  </Button>
                  {activeStep === 2 || activeStep === 3 ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        const alert = window.confirm(
                          "¿Seguro quieres cancelar esta orden?"
                        );
                        if (alert) {
                          handleCancel();
                        }
                      }}
                      size="large"
                    >
                      CANCELAR ORDEN
                    </Button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h3>Orden cancelada</h3>
      )}
    </div>
  );
}

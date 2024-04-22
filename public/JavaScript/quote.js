const projectTypeSelect = document.getElementById("project-type");
const projectSpecificQuestions = document.getElementById(
  "project-specific-questions"
);

projectTypeSelect.addEventListener("change", (event) => {
  const selectedProjectType = event.target.value;
  projectSpecificQuestions.innerHTML = ""; // Clear previous questions

  switch (selectedProjectType) {
    case "battery-storage":
      projectSpecificQuestions.innerHTML = `
        <div class="form-group">
          <label for="average-consumption">Average Monthly Electricity Consumption (kWh):</label>
          <input type="number" id="average-consumption" name="average-consumption" required />
        </div>
      `;
      break;
    case "energy-efficiency":
      projectSpecificQuestions.innerHTML = `
        <div class="form-group">
          <label for="energy-audit">Interested in an Energy Audit (Yes/No):</label>
          <select name="energy-audit" id="energy-audit">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      `;
      break;
    case "renewable-expansion":
      projectSpecificQuestions.innerHTML = `
        <div class="form-group">
          <label for="wind-interest">Interested in Wind Turbine Installation (Yes/No):</label>
          <select name="wind-interest" id="wind-interest">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="form-group">
          <label for="hydro-interest">Interested in Micro Hydropower Systems (Yes/No):</label>
          <select name="hydro-interest" id="hydro-interest">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      `;
      break;
    // ... other cases
  }
});

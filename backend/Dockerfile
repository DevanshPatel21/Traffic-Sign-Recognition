# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Ensure the model file is copied correctly
COPY model_trained.p /app/model_trained.p

# Expose port 5000 for the Flask app to listen
EXPOSE 5000

# Define environment variable (if needed)
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Command to run the application
CMD ["python", "app.py"]
